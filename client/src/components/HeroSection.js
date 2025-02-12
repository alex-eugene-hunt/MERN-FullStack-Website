import React, { useState, useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';
import myPhoto from '../assets/Headshot6 - edited.jpg';
import AsteroidsGame from '../games/AsteroidsGame';
import Navbar from './Navbar';
import SendEmailForm from './SendEmailForm';
import '@fontsource/lobster'; // Add Lobster font import
import '@fontsource/monoton'; // Add Monoton font import
import '@fontsource/montserrat'; // Add Montserrat font import
import '@fontsource/montserrat/600.css'; // SemiBold weight

function HeroSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('AlexAI says: Hello! What do you want to know about me?');

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 3000.00,
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

  async function askLLM(prompt) {
    const response = await fetch("http://localhost:8000/inference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt })
    });
    const data = await response.json();
    return data.response;
  }

  async function handleAskQuestion() {
    try {
      setDisplayedAnswer('AlexAI is thinking...');
      
      const answer = await askLLM(question);
      
      // Start typing effect
      let currentIndex = 0;
      const typingSpeed = 50; // milliseconds per character
      const prefix = 'AlexAI says: ';
      setDisplayedAnswer(prefix); // Start with just the prefix

      const intervalId = setInterval(() => {
        if (currentIndex <= answer.length) {
          setDisplayedAnswer(prefix + answer.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, typingSpeed);

    } catch (error) {
      console.error('Error fetching the model response:', error);
      setDisplayedAnswer('Error: ' + (error.message || 'Unable to get a response from the model.'));
    }
  }

  return (
    <div id="hero" style={styles.pageContainer}>
      <div ref={vantaRef} style={styles.vantaContainer}>
      </div>
        
      {/* Navbar */}
      <Navbar />
        
      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
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
          <div style={{...styles.box, backgroundColor: '#434a54'}}>
            <h3 style={{
                color: '#dcccbd', 
                textAlign: 'center', 
                fontFamily: 'Monoton', 
                fontSize: '35px',
                fontWeight: 'normal',
                marginTop: '2rem',
                marginBottom: '2rem'
              }}>
              Ask AlexAI
            </h3>
            <div style={{ 
              width: '80%', 
              margin: '0 auto', 
              display: 'flex', 
              gap: '0.5rem', 
              alignItems: 'center',
              position: 'relative',
              boxSizing: 'border-box'
            }}>
              <input
                type="text"
                placeholder="What do you want to know?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  ...styles.input,
                  width: '100%',
                  backgroundColor: '#dcccbd',
                  color: '#434a54',
                  margin: 0,
                  borderRadius: '10px',
                  paddingRight: '60px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '600',
                  boxSizing: 'border-box',
                  outline: 'none',
                  border: 'none'
                }}
              />
              <button onClick={handleAskQuestion} style={{
                position: 'absolute',
                right: '5px',
                backgroundColor: '#b14b32',
                color: '#dcccbd',
                border: 'none',
                borderRadius: '10px',
                padding: '4px 12px',
                height: '25px',
                cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600'
              }}>
                ASK
              </button>
            </div>
            <div style={{
              width: '80%',
              margin: '10px auto',
              backgroundColor: '#dcccbd',
              padding: '0.5rem',
              borderRadius: '10px',
              minHeight: '240px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
              color: '#434a54',
              boxSizing: 'border-box'
            }}>
              {displayedAnswer}
            </div>
          </div>

          {/* Box 2: Send Email */}
          <div style={{...styles.box, backgroundColor: '#b14b32'}}>
            <SendEmailForm />
          </div>

          {/* Box 3: Game Box */}
          <div style={{...styles.box, backgroundColor: '#000000'}}>
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
    position: 'relative',
    backgroundColor: '#021825',
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: 1,
    paddingTop: '5rem',
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
    margin: '0 0 0 254px', // Move image farther to the right
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
    borderRadius: '2.25rem',
    boxShadow: '1px 12px 25px rgb(0 0 0 / 78%)',
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