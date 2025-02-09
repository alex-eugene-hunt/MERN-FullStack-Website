import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import myPhoto from '../assets/Headshot6 - edited.jpg';
import AsteroidsGame from '../games/AsteroidsGame';
import Navbar from './Navbar';
import SendEmailForm from './SendEmailForm';
import '@fontsource/lobster'; // Add Lobster font import

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
      <div style={{ ...styles.contentWrapper, marginTop: '5rem' }}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <img src={myPhoto} alt="Alex Eugene Hunt" style={styles.heroImage} />
          <div style={styles.typewriterText}>
            <Typewriter
              options={{
                strings: ['Hi, I\'m Alex Hunt!', 'UC Berkeley Grad, Software Engineer, Data Scientist.',
                     'This website was built using the MERN stack!',
                  ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
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
              onChange={(e) => setQuestion(e.target.value.replace(/\s/g, ''))}
              style={styles.input}
            />
            <button onClick={handleAskQuestion} style={styles.askButton}>
              Ask
            </button>
            {answer && <p style={styles.answerBox}>{answer}</p>}
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
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100vh',
  },
  vantaContainer: {
    position: 'absolute', // Change to fixed for background effect
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1, // Put it behind all content
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '1rem',
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '1rem',
  },
  heroImage: {
    width: '150px', // Adjust the size as needed
    height: 'auto',
    borderRadius: '50%',
    margin: '0 0 0 15rem', // Move image farther to the right
    border: '3px solid #d4996f', // Add colored outline
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Add black shadow
    boxSizing: 'border-box', // Make border overlap with image
    padding: '0', // Remove any internal padding
  },
  typewriterText: {
    marginTop: '5rem', // Lower the text more
    marginLeft: '1rem', // Keep text to the right of the photo
    fontFamily: 'Lobster, cursive',
    fontWeight: 'normal',
    fontSize: '60px',
    color: '#dcccbd',
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
    width: '450px',
    height: '450px',
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