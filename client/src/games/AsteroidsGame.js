import React, { useState, useEffect, useRef, useCallback } from 'react';

const AsteroidsGame = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const keys = useRef({});

  // Game state
  const player = useRef({
    x: 0.5,
    y: 0.5,
    radius: 0.015,
    angle: -Math.PI / 2,
    rotation: 0,
    thrust: false,
    velocity: { x: 0, y: 0 },
    cooldown: 0,
    iFrames: 0, // invincibility frames
  });

  const bullets = useRef([]);
  const asteroids = useRef([]);
  const animationFrameId = useRef();

  // Helper: get container width/height
  const getDimensions = () => {
    if (!containerRef.current) return { width: 0, height: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { width: rect.width, height: rect.height - 40 };
  };

  // Spawn an asteroid outside [0..1], drifting inward
  function spawnAsteroid() {
    const side = Math.floor(Math.random() * 4);
    let x, y;
    switch (side) {
      case 0: // Left
        x = -0.05;
        y = Math.random();
        break;
      case 1: // Right
        x = 1.05;
        y = Math.random();
        break;
      case 2: // Top
        x = Math.random();
        y = -0.05;
        break;
      case 3: // Bottom
        x = Math.random();
        y = 1.05;
        break;
      default:
        x = Math.random();
        y = Math.random();
    }

    // aim velocity toward (0.5, 0.5)
    const angle = Math.atan2(0.5 - y, 0.5 - x);
    const speed = 0.002 + Math.random() * 0.003;

    asteroids.current.push({
      x,
      y,
      radius: 0.04,
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      },
    });
  }

  // Initialize/restart game
  const initGame = useCallback(() => {
    player.current = {
      x: 0.5,
      y: 0.5,
      radius: 0.015,
      angle: -Math.PI / 2,
      rotation: 0,
      thrust: false,
      velocity: { x: 0, y: 0 },
      cooldown: 0,
      iFrames: 0,
    };
    bullets.current = [];
    asteroids.current = [];
    setScore(0);
    setLives(3);
    setGameOver(false);

    // spawn initial asteroids
    for (let i = 0; i < 5; i++) {
      spawnAsteroid();
    }
  }, []);

  // Main game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameOver) return;  // Stop the loop if game is over
    const ctx = canvas.getContext('2d');
    const { width, height } = getDimensions();

    canvas.width = width;
    canvas.height = height;

    // Clear
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    // Controls
    if (keys.current.ArrowLeft) player.current.rotation = -0.05;
    if (keys.current.ArrowRight) player.current.rotation = 0.05;
    if (keys.current.ArrowUp) player.current.thrust = true;

    // Fire bullet if space pressed and cooldown <= 0
    if (keys.current[' '] && player.current.cooldown <= 0) {
      bullets.current.push({
        x: player.current.x + Math.cos(player.current.angle) * 0.05,
        y: player.current.y + Math.sin(player.current.angle) * 0.05,
        velocity: {
          x: Math.cos(player.current.angle) * 0.007,
          y: Math.sin(player.current.angle) * 0.007,
        },
        timer: 100,
      });
      player.current.cooldown = 10;
    }

    // Update player (angle, velocity, etc.)
    player.current.angle += player.current.rotation;
    if (player.current.thrust) {
      player.current.velocity.x += Math.cos(player.current.angle) * 0.0002;
      player.current.velocity.y += Math.sin(player.current.angle) * 0.0002;
    }
    player.current.x += player.current.velocity.x;
    player.current.y += player.current.velocity.y;
    player.current.cooldown--;
    player.current.thrust = false;
    player.current.rotation = 0;

    // Decrement invincibility frames
    if (player.current.iFrames > 0) {
      player.current.iFrames--;
    }

    // Wrapping player
    player.current.x = (player.current.x + 1) % 1;
    player.current.y = (player.current.y + 1) % 1;

    // Update bullets
    bullets.current = bullets.current.filter((bullet) => {
      bullet.x += bullet.velocity.x;
      bullet.y += bullet.velocity.y;
      bullet.timer--;
      return bullet.timer > 0; // remove if timer < 0
    });

    // Update asteroids
    asteroids.current = asteroids.current.filter((asteroid) => {
      asteroid.x += asteroid.velocity.x;
      asteroid.y += asteroid.velocity.y;

      // bullet collision check
      const hit = bullets.current.some((bullet) => {
        const dx = bullet.x - asteroid.x;
        const dy = bullet.y - asteroid.y;
        return Math.sqrt(dx * dx + dy * dy) < asteroid.radius;
      });
      if (hit) {
        setScore((prev) => prev + 100);
      }
      return !hit; // remove if hit
    });

    // Random spawn chance
    if (Math.random() < 0.01 && !gameOver) {
      spawnAsteroid();
    }

    // Collision with asteroids (only if not invincible)
    if (player.current.iFrames <= 0 && !gameOver) {
      const collision = asteroids.current.some((asteroid) => {
        const dx = player.current.x - asteroid.x;
        const dy = player.current.y - asteroid.y;
        return (
          Math.sqrt(dx * dx + dy * dy) <
          player.current.radius + asteroid.radius
        );
      });

      // If collision, lose life, set invincibility
      if (collision) {
        setLives((prevLives) => {
          const newLives = prevLives - 1;
          if (newLives <= 0) {
            setGameOver(true);
            return 0;
          }
          player.current.iFrames = 100;
          return newLives;
        });
      }
    }

    // Draw helpers
    const drawPos = (x, y) => [x * width, y * height];

    // Draw player
    ctx.strokeStyle = player.current.iFrames > 0 ? 'cyan' : 'white'; 
    // show a different color if invincible
    ctx.lineWidth = 2;
    const [px, py] = drawPos(player.current.x, player.current.y);
    ctx.beginPath();
    ctx.moveTo(
      px + Math.cos(player.current.angle) * 20,
      py + Math.sin(player.current.angle) * 20
    );
    ctx.lineTo(
      px + Math.cos(player.current.angle + 2.3) * 15,
      py + Math.sin(player.current.angle + 2.3) * 15
    );
    ctx.lineTo(
      px + Math.cos(player.current.angle - 2.3) * 15,
      py + Math.sin(player.current.angle - 2.3) * 15
    );
    ctx.closePath();
    ctx.stroke();

    // Draw bullets as red lasers
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    bullets.current.forEach((bullet) => {
      const [bx, by] = drawPos(bullet.x, bullet.y);

      // We'll make a bigger tail
      const laserLength = 25; // bigger tail
      const velX = bullet.velocity.x * width;
      const velY = bullet.velocity.y * height;

      // multiply by (laserLength / 10) => bigger line
      const tailX = bx - velX * (laserLength / 10);
      const tailY = by - velY * (laserLength / 10);

      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    });

    // Draw asteroids
    ctx.strokeStyle = 'white';
    asteroids.current.forEach((asteroid) => {
      const [ax, ay] = drawPos(asteroid.x, asteroid.y);
      ctx.beginPath();
      ctx.arc(ax, ay, asteroid.radius * width, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Continue the loop
    animationFrameId.current = requestAnimationFrame(gameLoop);
  }, [gameOver]);  // Add gameOver to dependencies

  // Key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
      if (e.key === ' ') e.preventDefault(); // prevent page scroll on space
    };
    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Start game & loop
  useEffect(() => {
    if (gameStarted && !gameOver) {
      initGame();
      gameLoop();
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameLoop, gameStarted, gameOver, initGame]);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setLives(3);
    setGameStarted(false);
    player.current = {
      x: 0.5,
      y: 0.5,
      radius: 0.015,
      angle: -Math.PI / 2,
      rotation: 0,
      thrust: false,
      velocity: { x: 0, y: 0 },
      cooldown: 0,
      iFrames: 0,
    };
    bullets.current = [];
    asteroids.current = [];
  };

  return (
    <div ref={containerRef} style={styles.container}>
      {!gameStarted && !gameOver && (
        <div style={styles.startButtonContainer}>
          <button style={styles.startButton} onClick={startGame}>Start Game</button>
        </div>
      )}
      {gameOver && (
        <div style={styles.gameOverContainer}>
          <div style={styles.gameOverBox}>
            <h2 style={styles.gameOverText}>Game Over!</h2>
            <p style={styles.gameOverScore}>Score: {score}</p>
            <button style={styles.startButton} onClick={resetGame}>Play Again?</button>
          </div>
        </div>
      )}
      <div style={styles.controls}>
        <span style={styles.controlItem}>← → Rotate</span>
        <span style={styles.controlItem}>↑ Thrust</span>
        <span style={styles.controlItem}>Space Shoot</span>
      </div>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.status}>
        <div>Score: {score}</div>
        {/* Show as many hearts as the player has lives */}
        <div>Lives: {'♥'.repeat(lives)}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: 'calc(100% - 40px)',
    backgroundColor: 'black',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    padding: '8px',
    backgroundColor: '#222',
    color: 'white',
    fontSize: '0.9rem',
    width: '100%',
  },
  controlItem: {
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #666',
  },
  status: {
    position: 'absolute',
    top: '48px',
    left: '16px',
    color: 'white',
    fontFamily: 'monospace',
    fontSize: '16px',
  },
  gameOver: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '24px',
    marginTop: '16px',
  },
  startButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  },
  startButton: {
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    border: '2px solid white',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  gameOverContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
  },
  gameOverBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid white',
    padding: '20px 40px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: '32px',
    margin: '0 0 20px 0',
  },
  gameOverScore: {
    color: 'white',
    fontSize: '24px',
    margin: '0 0 20px 0',
  },
};

export default AsteroidsGame;
