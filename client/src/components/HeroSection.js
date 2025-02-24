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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key not found. Please check your environment variables or GitHub secrets.');
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          model: "ft:gpt-3.5-turbo-0125:personal:alex-ai:B3uSVuN6",
          messages: [
            {
              role: "system",
              content: "You are AlexAI, a digital assistant representing Alex Hunt, a Software Engineer and Data Scientist based in San Francisco. Answer questions about Alex's background, skills, and experiences."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Response error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error in askLLM:', error);
      throw error;
    }
  }

  async function handleAskQuestion(e) {
    e?.preventDefault(); // Prevent form submission if called from form
    if (!question.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      setDisplayedAnswer('AlexAI is thinking...');
      
      const answer = await askLLM(question);
      
      // Start typing effect
      let currentIndex = 0;
      const typingSpeed = 30; // milliseconds per character
      const prefix = 'AlexAI: ';
      setDisplayedAnswer(prefix); // Start with just the prefix

      const intervalId = setInterval(() => {
        if (currentIndex <= answer.length) {
          setDisplayedAnswer(prefix + answer.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsLoading(false);
          setDisplayedAnswer(prefix + answer);
        }
      }, typingSpeed);

    } catch (error) {
      console.error('Error fetching the model response:', error);
      setError(error.message || 'Unable to get a response. Please try again.');
      setDisplayedAnswer('Error: ' + (error.message || 'Unable to get a response. Please try again.'));
      setIsLoading(false);
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleAskQuestion();
    }
  };

  const handleTouchStart = (e) => {
    // Prevent swipe if interacting with input or button elements
    if (['input', 'button'].includes(e.target.tagName.toLowerCase())) {
      setTouchStart(null);
      return;
    }
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) {
      return;
    }
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      return;
    }
    if (!isTransitioning) {
      const swipeThreshold = 50; // minimum distance for a swipe
      const swipeDistance = touchStart - touchEnd;

      if (Math.abs(swipeDistance) > swipeThreshold) {
        setIsTransitioning(true);
        if (swipeDistance > 0) {
          // Swipe left
          setCurrentSlide(prev => (prev === 0 ? 1 : 0));
        } else {
          // Swipe right
          setCurrentSlide(prev => (prev === 1 ? 0 : 1));
        }
        setTimeout(() => setIsTransitioning(false), 300); // Match transition duration
      }
    }
  };

  const galleryStyles = {
    mobileGallery: {
      width: '100%',
      maxWidth: '450px',
      overflow: 'hidden',
      position: 'relative',
      marginBottom: '20px',
      height: '400px', // Set a fixed height for consistency
    },
    galleryTrack: {
      display: 'flex',
      width: '200%',
      height: '100%',
      transform: `translateX(-${currentSlide * 50}%)`,
      transition: isTransitioning ? 'transform 0.3s ease-out' : 'none'
    },
    gallerySlide: {
      flex: '0 0 50%',
      height: '100%',
      boxSizing: 'border-box',
      padding: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      position: 'absolute',
      top: '10px',
      left: '0',
      right: '0',
      zIndex: 10
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#dcccbd',
      transition: 'background-color 0.3s ease'
    },
    activeDot: {
      backgroundColor: '#d4996f'
    }
  };

  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @media (max-width: 768px) {
      .navbar-container {
        height: auto !important;
      }

      .navbar {
        position: absolute !important;
      }

      .hero-section {
        flex-direction: column !important;
        align-items: center !important;
        justify-content: flex-start !important;
        padding: 0 0.5rem 0.5rem !important;
        text-align: center !important;
        margin-top: 0 !important;
      }

      .contentWrapper {
        padding-top: 0 !important;
        margin-top: 2rem !important;
      }

      .hero-image {
        margin: 0 auto !important;
        width: 180px !important;
      }

      .typewriter-text {
        margin: 1rem auto 0 !important;
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
        padding: 0.5rem !important;
        gap: 0 !important;
        margin-top: 0.5rem !important;
      }

      .hero-box {
        width: 90% !important;
        max-width: 450px !important;
        margin: 0 auto !important;
        flex: none !important;
      }

      .game-box {
        display: none !important;
      }

      .hero-box.contact-box {
        height: 400px !important;
        min-height: 400px !important;
      }

      .llm-box {
        height: 400px !important;
        min-height: 400px !important;
      }
    }
  `;
  document.head.appendChild(styleTag);

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
          {isMobile ? (
            <div 
              className="mobile-gallery"
              style={galleryStyles.mobileGallery}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="gallery-track" style={galleryStyles.galleryTrack}>
                {/* First Slide: AlexAI */}
                <div className="gallery-slide" style={galleryStyles.gallerySlide}>
                  <div style={{...styles.box, backgroundColor: '#434a54', height: '100%', display: 'flex', flexDirection: 'column'}} className="hero-box llm-box">
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
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
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
                          border: 'none',
                          opacity: isLoading ? 0.7 : 1,
                        }}
                      />
                      <button 
                        onClick={handleAskQuestion} 
                        disabled={isLoading || !question.trim()}
                        style={{
                          position: 'absolute',
                          right: '5px',
                          backgroundColor: isLoading ? '#666' : '#b14b32',
                          color: '#dcccbd',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '4px 12px',
                          height: '25px',
                          cursor: isLoading ? 'not-allowed' : 'pointer',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: '600',
                          opacity: (!question.trim() || isLoading) ? 0.7 : 1,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isLoading ? '...' : 'ASK'}
                      </button>
                    </div>
                    <div style={{
                      width: '80%',
                      margin: '10px auto',
                      backgroundColor: '#dcccbd',
                      padding: '1rem',
                      borderRadius: '10px',
                      minHeight: '240px',
                      maxHeight: '240px',
                      overflowY: 'auto',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      color: error ? '#b14b32' : '#434a54',
                      whiteSpace: 'pre-wrap',
                      scrollBehavior: 'smooth'
                    }}>
                      <strong>{displayedAnswer}</strong>
                    </div>
                  </div>
                </div>
                {/* Second Slide: Contact Form */}
                <div className="gallery-slide" style={galleryStyles.gallerySlide}>
                  <div style={{...styles.box, backgroundColor: '#b14b32', height: '100%', display: 'flex', flexDirection: 'column'}} className="hero-box contact-box">
                    <SendEmailForm />
                  </div>
                </div>
              </div>
              {/* Slide indicators */}
              <div style={galleryStyles.indicator}>
                <div style={{
                  ...galleryStyles.dot,
                  ...(currentSlide === 0 ? galleryStyles.activeDot : {})
                }}></div>
                <div style={{
                  ...galleryStyles.dot,
                  ...(currentSlide === 1 ? galleryStyles.activeDot : {})
                }}></div>
              </div>
            </div>
          ) : (
            // Desktop version
            <>
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
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
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
                      border: 'none',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  />
                  <button 
                    onClick={handleAskQuestion} 
                    disabled={isLoading || !question.trim()}
                    style={{
                      position: 'absolute',
                      right: '5px',
                      backgroundColor: isLoading ? '#666' : '#b14b32',
                      color: '#dcccbd',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      height: '25px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '600',
                      opacity: (!question.trim() || isLoading) ? 0.7 : 1,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isLoading ? '...' : 'ASK'}
                  </button>
                </div>
                <div style={{
                  width: '80%',
                  margin: '10px auto',
                  backgroundColor: '#dcccbd',
                  padding: '1rem',
                  borderRadius: '10px',
                  minHeight: '240px',
                  maxHeight: '240px',
                  overflowY: 'auto',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: error ? '#b14b32' : '#434a54',
                  whiteSpace: 'pre-wrap',
                  scrollBehavior: 'smooth'
                }}>
                  <strong>{displayedAnswer}</strong>
                </div>
              </div>
              <div style={{...styles.box, backgroundColor: '#b14b32'}} className="hero-box contact-box">
                <SendEmailForm />
              </div>
            </>
          )}

          {/* Box 3: Game */}
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
  mobileGalleryContainer: {
    width: '100%',
    backgroundColor: '#434a54',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '20px'
  }
};

export default HeroSection;