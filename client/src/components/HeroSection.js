import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import myPhoto from '../assets/Headshot6 - edited.jpg';
import AsteroidsGame from '../games/AsteroidsGame';

function SendEmailForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('https://mern-fullstack-website.onrender.com/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only send name and message in the request body
        body: JSON.stringify({ name, message }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setMessage('');
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error sending message.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
      <h3>Send me a Message</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...styles.input, height: '100px', resize: 'none' }}
          required
        />
        <br />
        <button type="submit" style={styles.askButton}>
          Send
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

function HeroSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x5c85dd,
          backgroundColor: 0x2b2b2f,
          points: 20.0,
          maxDistance: 24.0,
          spacing: 17.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  async function handleAskQuestion() {
    setAnswer('AI says: That is a great question about you, Alex!');
  }

  return (
    <div style={styles.pageContainer}>
      {/* Vanta.js Background */}
      <div ref={vantaRef} style={styles.vantaContainer}></div>
      
      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <img 
            src={myPhoto} 
            alt="Alex Eugene Hunt" 
            style={styles.heroImage} 
          />
          <div style={styles.typewriterText}>
            <Typewriter
              options={{
                strings: [
                  'Hello! My name is Alex.',
                  'I am a software engineer...',
                  'Building full-stack apps with MERN!',
                ],
                autoStart: true,
                loop: true,
                pauseFor: 2000,
              }}
            />
          </div>
        </div>

        {/* Three Boxes Section */}
        <div style={styles.boxesContainer}>
          {/* Box 1: LLM */}
          <div style={styles.box}>
            <h3>Ask a question about me</h3>
            <input 
              type="text"
              placeholder="What's on your mind?" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleAskQuestion} style={styles.askButton}>
              Ask
            </button>
            {answer && (
              <p style={styles.answerBox}>{answer}</p>
            )}
          </div>

          {/* Box 2: Send Email */}
          <div style={styles.box}>
            <SendEmailForm />
          </div>

          {/* Box 3: Game Box */}
          <div style={styles.box}>
            <AsteroidsGame />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  vantaContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '4rem',
    paddingBottom: '2rem',
  },
  heroImage: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  typewriterText: {
    fontFamily: 'Consolas, monospace',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#fff',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  boxesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
    padding: '2rem',
    width: '75%',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  box: {
    flex: 1,
    minWidth: '200px',
    height: '460px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '90%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  askButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  answerBox: {
    marginTop: '0.5rem',
    backgroundColor: '#f9f9f9',
    padding: '0.5rem',
    borderRadius: '4px',
  },
};

export default HeroSection;
