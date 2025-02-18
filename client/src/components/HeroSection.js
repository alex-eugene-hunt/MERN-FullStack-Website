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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div style={styles.pageContainer}>
      <div ref={vantaRef} style={styles.vantaContainer}>
      </div>
        
      {/* Navbar */}
      <Navbar />
        
      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
        {/* Hero Section */}
        <div style={styles.heroSection} className="hero-section">
          <img src={myPhoto} alt="Alex Eugene Hunt" style={styles.heroImage} className="hero-image" />
          <div style={styles.typewriterText} className="typewriter-text">
            <Typewriter
              options={{
                strings: isMobile 
                  ? ['Hi, I\'m Alex Hunt!', 'Visit this site on Desktop!']
                  : ['Hi, I\'m Alex Hunt!', 'UC Berkeley Grad, Software Engineer, Data Scientist.',
                     'This website was built using the MERN stack!'],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </div>
        </div>

        {/* Three Boxes Section */}
        <div style={styles.boxesContainer} className="boxes-container">
          {/* Box 1: LLM */}
          <div style={{...styles.box, backgroundColor: '#434a54'}} className="hero-box llm-box">
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
          <div style={{...styles.box, backgroundColor: '#b14b32'}} className="hero-box contact-box">
            <SendEmailForm />
          </div>

          {/* Box 3: Game Box */}
          <div style={{...styles.box, backgroundColor: '#000000'}} className="hero-box game-box">
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
    width: '100%',
  },
  heroImage: {
    width: '150px', 
    height: 'auto',
    borderRadius: '50%',
    margin: '0 0 0 254px', 
    border: '3px solid #d4996f', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
    boxSizing: 'border-box', 
    padding: '0', 
  },
  typewriterText: {
    marginTop: '5rem', 
    marginLeft: '1rem', 
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

const styleTag = document.createElement('style');
styleTag.textContent = `
  @media (max-width: 768px) {
    .hero-section {
      flex-direction: column !important;
      align-items: center !important;
      justify-content: flex-start !important;
      padding: 1rem 0.5rem 2rem !important;
      text-align: center !important;
      margin-top: -15px !important;
    }

    .hero-image {
      margin: 0 auto !important;
      width: 180px !important;
    }

    .typewriter-text {
      margin: 1rem auto !important;
      text-align: center !important;
      font-size: 32px !important;
      width: 100% !important;
      padding: 0 1rem !important;
    }

    .boxes-container {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      width: 100% !important;
      padding: 1rem !important;
      gap: 1rem !important;
    }

    .hero-box {
      width: 90% !important;
      max-width: 450px !important;
      margin: 0 auto 1rem auto !important;
      flex: none !important;
    }

    .game-box,
    .llm-box {
      display: none !important;
    }

    .hero-box.contact-box {
      height: auto !important;
      min-height: 400px !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default HeroSection;