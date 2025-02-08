import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import myPhoto from '../assets/Headshot6 - edited.jpg';
import AsteroidsGame from '../games/AsteroidsGame';
import Navbar from './Navbar';
import SendEmailForm from './SendEmailForm';

function HeroSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x021825
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
    <div id="hero" style={styles.pageContainer}>
      {/* Vanta.js Background */}
      <div ref={vantaRef} style={styles.vantaContainer}>
      </div>
        
      {/* Navbar */}
      <Navbar />
        
      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
        <div style={styles.mainContent}>
          {/* Hero Section with Photo and Typewriter */}
          <div style={styles.heroSection}>
            <img src={myPhoto} alt="Alex Eugene Hunt" style={styles.heroImage} />
            <div style={styles.typewriterText}>
              <Typewriter
                options={{
                  strings: ['Full Stack Developer', 'UC Berkeley Graduate', 'Software Engineer'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </div>
          </div>

          {/* Ask About Me Box */}
          <div style={styles.box}>
            <h3>Ask a question about me</h3>
            <input
              type="text"
              placeholder="What's on your mind?"
              value={question}
              onChange={(e) => setQuestion(e.target.value.replace(/\s/g, ''))}
              style={styles.input}
            />
            <button onClick={handleAskQuestion} style={styles.askButton}>
              Ask
            </button>
            {answer && <p style={styles.answerBox}>{answer}</p>}
          </div>
        </div>

        {/* Other Boxes Section */}
        <div style={styles.boxesContainer}>
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
    margin: 0,
    padding: 0,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  vantaContainer: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  heroImage: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  },
  typewriterText: {
    color: '#fff',
    fontSize: '1.5rem',
    textAlign: 'center',
    minHeight: '3rem',
  },
  boxesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    minWidth: '300px',
    maxWidth: '400px',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  askButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  answerBox: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    border: '1px solid #dee2e6',
  },
};

export default HeroSection;