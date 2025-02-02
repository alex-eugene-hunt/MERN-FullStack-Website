import React, { useState, useEffect, useRef, useCallback } from 'react';

const AsteroidsGame = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [highScores, setHighScores] = useState([]);
  // Removed submitStatus and instead use "submitted" to change the button text.
  const [submitted, setSubmitted] = useState(false);
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
            // Reset submission state in case the player plays again
            setSubmitted(false);
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
      const laserLength = 25;
      const velX = bullet.velocity.x * width;
      const velY = bullet.velocity.y * height;
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
  }, [gameOver]);

  // Fetch high scores
  const fetchHighScores = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/highscores/Asteroids`);
      const data = await response.json();
      setHighScores(data);
    } catch (error) {
      console.error('Error fetching high scores:', error);
    }
  }, []);

  // Submit high score
  const submitHighScore = async () => {
    if (!playerName.trim()) {
      // You could show an alert or handle it however you prefer
      alert('Please enter your name');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/highscores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: playerName.trim(),
          score: score,
          game: 'Asteroids'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit score');
      }

      await fetchHighScores(); // Refresh the high scores
      // Instead of showing output text, change the button's content to a checkmark.
      setSubmitted(true);
      setPlayerName('');
      
      // Reset the game after a short delay to show the checkmark
      setTimeout(() => {
        resetGame();
        setSubmitted(false);
      }, 1500);

    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Failed to submit score. Please try again.');
    }
  };

  // Key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      keys.current[e.key] = true;
      // Prevent space scrolling when game canvas is focused or being played
      if (e.key === ' ' && (document.activeElement === canvasRef.current || keys.current['ArrowUp'] || keys.current['ArrowDown'] || keys.current['ArrowLeft'] || keys.current['ArrowRight'])) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      keys.current[e.key] = false;
    };

    // Add click handler to focus canvas
    const canvas = canvasRef.current;
    const handleCanvasClick = () => {
      canvas.focus();
    };

    canvas.addEventListener('click', handleCanvasClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Make canvas focusable
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.tabIndex = 0; // Make canvas focusable
      canvasRef.current.style.outline = 'none'; // Remove focus outline
    }
  }, []);

  // Start game & loop
  useEffect(() => {
    fetchHighScores();
    if (gameStarted && !gameOver) {
      initGame();
      gameLoop();
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [gameLoop, gameStarted, gameOver, initGame, fetchHighScores]);

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
    <div ref={containerRef} style={{
      width: '100%', 
      height: '100%',
      overflow: 'hidden', // Prevent scrolling in game container
      position: 'relative',
      backgroundColor: 'black',
      fontFamily: 'Consolas, monospace',
    }}>
      {!gameStarted && !gameOver && (
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 1,
          color: 'white',
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '15px',
            borderRadius: '10px',
            border: '2px solid white',
            width: '300px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Consolas, monospace',
          }}>
            <h2 style={{
              fontSize: '28px',
              margin: '0 0 5px 0',
              color: 'white',
              fontFamily: 'Consolas, monospace',
            }}>High Scores</h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0',
              textAlign: 'center',
            }}>
              {highScores.map((score, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: '18px',
                    padding: '8px 0',
                    color:
                      index === 0 ? '#FFD700' : // Gold
                      index === 1 ? '#C0C0C0' : // Silver
                      index === 2 ? '#CD7F32' : // Bronze
                      'white',
                  }}
                >
                  {index + 1}. {score.playerName}: {score.score}
                </li>
              ))}
            </ul>
            <button style={{
              padding: '10px 30px',
              fontSize: '18px',
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid white',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '2px',
              marginBottom: '2px',
              transition: 'background-color 0.2s',
              fontFamily: 'Consolas, monospace',
            }} onClick={startGame}>Start Game</button>
          </div>
        </div>
      )}
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 1,
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '15px',
            borderRadius: '10px',
            border: '2px solid white',
            width: '300px',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'Consolas, monospace',
          }}>
            <h2 style={{
              fontSize: '28px',
              margin: '0 0 5px 0',
              color: 'white',
              fontFamily: 'Consolas, monospace',
            }}>Game Over!</h2>
            <p style={{
              fontSize: '20px',
              margin: '0 0 10px 0',
              color: 'white',
              fontFamily: 'Consolas, monospace',
            }}>Score: {score}</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                margin: '10px 0',
                padding: '8px',
                width: '200px',
                borderRadius: '5px',
                border: '2px solid white',
                background: 'black',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'Consolas, monospace',
              }}
            />
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              marginTop: '10px',
            }}>
              <button 
                onClick={submitHighScore} 
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  backgroundColor: 'black',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontFamily: 'Consolas, monospace',
                  transition: 'background-color 0.2s',
                }}
                disabled={submitted}
              >
                {submitted ? <span style={{ color: 'white', fontSize: '20px' }}>✓</span> : 'Submit Score'}
              </button>
              <button style={{
                padding: '10px 20px',
                cursor: 'pointer',
                backgroundColor: 'black',
                color: 'white',
                border: '2px solid white',
                borderRadius: '5px',
                fontSize: '16px',
                fontFamily: 'Consolas, monospace',
                transition: 'background-color 0.2s',
              }} onClick={resetGame}>
                Play Again?
              </button>
            </div>
          </div>
        </div>
      )}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '8px',
        backgroundColor: '#222',
        color: 'white',
        fontSize: '0.9rem',
        width: '100%',
      }}>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #666',
        }}>← → Rotate</span>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #666',
        }}>↑ Thrust</span>
        <span style={{
          padding: '4px 8px',
          borderRadius: '4px',
          border: '1px solid #666',
        }}>Space Shoot</span>
      </div>
      <canvas ref={canvasRef} style={{
        width: '100%',
        height: 'calc(100% - 40px)',
        backgroundColor: 'black',
      }} />
      <div style={{
        position: 'absolute',
        top: '48px',
        left: '16px',
        color: 'white',
        fontFamily: 'Consolas, monospace',
        fontSize: '16px',
      }}>
        <span>Score: {score}</span>
        <span> Lives: {lives}</span>
      </div>
    </div>
  );
};

export default AsteroidsGame;
