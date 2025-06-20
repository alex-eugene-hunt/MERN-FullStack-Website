import React, { useState, useEffect } from 'react';
import { FaGuitar, FaBeer, FaHiking, FaGamepad, FaPlane, FaUtensils, FaCode, FaSkiing, FaFish, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaUser } from 'react-icons/fa';
import AboutMe1 from '../assets/AboutMe_1.jpg';
import AboutMe2 from '../assets/AboutMe_2.jpeg';
import AboutMe3 from '../assets/AboutMe_3.jpeg';
import AboutMe4 from '../assets/AboutMe_4.jpg';
import AboutMe5 from '../assets/AboutMe_5.jpg';

function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardAnimationStates, setCardAnimationStates] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const photos = [AboutMe1, AboutMe2, AboutMe3, AboutMe4, AboutMe5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (index) => {
    if (!isMobile) return; // Only handle clicks on mobile

    // First stage: Lift and scale up
    setCardAnimationStates(prev => ({
      ...prev,
      [index]: 'lifting'
    }));

    // Second stage: Flip
    setTimeout(() => {
      setFlippedCards(prev => {
        const newFlipped = [...prev];
        newFlipped[index] = !newFlipped[index];
        return newFlipped;
      });
    }, 500);

    // Final stage: Return to normal size
    setTimeout(() => {
      setCardAnimationStates(prev => ({
        ...prev,
        [index]: 'normal'
      }));
    }, 1000);
  };

  const interests = [
    { 
      icon: <FaGuitar />, 
      label: 'Guitar',
      description: 'I love playing folk and blues acoustic guitar.'
    },
    { 
      icon: <FaBeer />, 
      label: 'Craft Beer',
      description: 'I enjoy exploring local breweries. IPAs and stouts!'
    },
    { 
      icon: <FaHiking />, 
      label: 'Hiking',
      description: 'Frequently go hiking in Oklahoma.'
    },
    { 
      icon: <FaGamepad />, 
      label: 'Gaming',
      description: 'Currently playing Marvel Rivals and Madden!'
    },
    { 
      icon: <FaPlane />, 
      label: 'Travel',
      description: 'I love traveling. I want to visit Norway.'
    },
    { 
      icon: <FaUtensils />, 
      label: 'Cooking',
      description: 'I love cooking and experimenting with different cuisines.'
    },
    { 
      icon: <FaCode />, 
      label: 'Coding',
      description: 'I love working on personal coding projects.'
    },
    { 
      icon: <FaSkiing />, 
      label: 'Skiing',
      description: 'I\'m an avid skier.'
    },
    { 
      icon: <FaFish />, 
      label: 'Fishing',
      description: 'I enjoy both freshwater and saltwater fishing.'
    },
  ];

  const quickFacts = [
    { icon: <FaUser />, label: 'Full Name', value: 'Alex Eugene Hunt' },
    { icon: <FaBirthdayCake />, label: 'Birth Day', value: 'September 14th, 2000' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Oklahoma City, OK' },
    { icon: <FaPhone />, label: 'Phone', value: '(405) 885-3808' },
    { icon: <FaEnvelope />, label: 'Email', value: 'alex.eugene.hunt@gmail.com' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      height: '100%',
      backgroundColor: '#021825',
      backgroundImage: 'linear-gradient(135deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(225deg, rgba(67, 74, 84, 1) 25%, transparent 25%), linear-gradient(315deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(45deg, rgba(67, 74, 84, 1) 25%, #021825 25%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '-10px 0, -10px 0, 0 0, 0 0'
    }} id="about">
      <style>
        {`
          @media (max-width: 768px) {
            #about {
              overflow-x: hidden !important;
            }
            .grid-container {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
            .grid-item {
              height: auto !important;
              min-height: 300px !important;
            }
            .slideshow-container {
              height: 300px !important;
            }
            .bio-content {
              padding: 1rem !important;
            }
            .bio-paragraph {
              font-size: 0.9rem !important;
              margin-bottom: 0.75rem !important;
            }
            .quick-facts-container {
              padding: 1rem !important;
              gap: 1rem !important;
            }
            .quick-fact-icon {
              font-size: 1.25rem !important;
              width: 2rem !important;
            }
            .quick-fact-label {
              font-size: 0.85rem !important;
            }
            .quick-fact-value {
              font-size: 0.9rem !important;
            }
            .interests-grid {
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 0.75rem !important;
              padding: 0.75rem !important;
            }
            .interest-icon {
              font-size: 1.25rem !important;
            }
            .interest-label {
              font-size: 0.65rem !important;
              margin-top: 0.25rem !important;
            }
            .interest-description {
              font-size: 0.6rem !important;
              padding: 0.25rem !important;
              line-height: 1.2 !important;
            }
          }
        `}
      </style>
      <div className="section-header">About</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.gridContainer} className="grid-container">
            {/* Top Left - Image Slideshow */}
            <div style={styles.gridItem} className="grid-item">
              <div style={{...styles.slideshowContainer, border: '2px solid #dcccbd'}} className="slideshow-container">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`About Me ${index + 1}`}
                    style={{
                      ...styles.slideImage,
                      opacity: currentSlide === index ? 1 : 0,
                    }}
                  />
                ))}
                <div style={styles.slideDots}>
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      style={{
                        ...styles.slideDot,
                        backgroundColor: currentSlide === index ? '#b14b32' : '#d4996f',
                      }}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Top Right - Bio */}
            <div style={styles.gridItem} className="grid-item">
              <div style={{...styles.gridBox, backgroundColor: '#434a54', border: '2px solid #dcccbd'}}>
                <div style={styles.bioContent} className="bio-content">
                  <p style={styles.paragraph} className="bio-paragraph">
                    Hello! 👋🏻 My name is Alex Hunt. This is my personal portfolio website built from scratch. 
                    Please visit on desktop for more content and please try to get a highscore on Asteroids!
                    Right now I am searching for a job in the tech industry, looking for a position as a Software Engineer or Data Scientist.
                  </p>
                  <p style={styles.paragraph} className="bio-paragraph">
                    What drives me is the opportunity to solve complex problems and help solve real-world problems.
                    I am always looking for new challenges and new things to learn and can easily adapt to any environment.
                    I enjoy working on projects where I can contribute to the team and learn from my colleagues.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Left - Quick Facts */}
            <div style={styles.gridItem} className="grid-item">
              <div style={{...styles.gridBox, backgroundColor: '#434a54', border: '2px solid #dcccbd'}}>
                <div style={styles.quickFactsContainer} className="quick-facts-container">
                  {quickFacts.map((fact, index) => (
                    <div key={index} style={styles.quickFactItem}>
                      <div style={styles.quickFactIcon} className="quick-fact-icon">{fact.icon}</div>
                      <div style={styles.quickFactContent}>
                        <div style={styles.quickFactLabel} className="quick-fact-label">{fact.label}</div>
                        <div style={styles.quickFactValue} className="quick-fact-value">{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Right - Interest Icons */}
            <div style={styles.gridItem} className="grid-item">
              <div style={{...styles.gridBox, backgroundColor: '#b14b32', border: '2px solid #dcccbd'}}>
                <div style={styles.interestsGrid} className="interests-grid">
                  {interests.map((interest, index) => (
                    <div key={index} style={styles.interestItemContainer}>
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        perspective: 1500,
                      }}>
                        <div 
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            cursor: 'pointer',
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            WebkitTransition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            borderRadius: '1rem',
                            backgroundColor: '#434a54',
                            transform: `${
                              cardAnimationStates[index] === 'lifting'
                                ? 'translate3d(0, -16px, 0) scale3d(1.2, 1.2, 1)'
                                : ''
                            } ${
                              !isMobile && hoveredCard === index
                                ? 'translate3d(0, -16px, 0) scale3d(1.2, 1.2, 1)'
                                : 'translate3d(0, 0, 0)'
                            }`,
                            boxShadow: (hoveredCard === index || cardAnimationStates[index] === 'lifting')
                              ? '0 16px 32px rgba(0,0,0,0.3)'
                              : 'none'
                          }}
                          onClick={() => handleCardClick(index)}
                          onMouseEnter={() => !isMobile && setHoveredCard(index)}
                          onMouseLeave={() => !isMobile && setHoveredCard(null)}
                        >
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            WebkitTransformStyle: 'preserve-3d',
                            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            WebkitTransition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            transform: flippedCards[index] || (!isMobile && hoveredCard === index)
                              ? 'rotateY(180deg)'
                              : 'rotateY(0)',
                            WebkitTransform: flippedCards[index] || (!isMobile && hoveredCard === index)
                              ? 'rotateY(180deg)'
                              : 'rotateY(0)',
                          }}>
                            <div style={styles.cardFront}>
                              <div style={styles.contentWrapper}>
                                <div style={styles.interestIcon} className="interest-icon">{interest.icon}</div>
                                <span style={styles.interestLabel} className="interest-label">{interest.label}</span>
                              </div>
                            </div>
                            <div style={styles.cardBack}>
                              <p style={styles.description} className="interest-description">{interest.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    padding: 0,
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(auto, 450px))',
    gap: '2rem',
    width: '100%',
    justifyContent: 'center',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '450px',
    width: '100%',
  },
  gridBox: {
    backgroundColor: '#434a54',
    borderRadius: '2.25rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideshowContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '2.25rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  slideImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease-in-out',
  },
  slideDots: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
    zIndex: 1,
  },
  slideDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  bioContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#dcccbd',
    marginBottom: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  },
  quickFactsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.75rem',
    width: '100%',
    padding: '1.5rem',
  },
  quickFactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    color: '#dcccbd',
  },
  quickFactIcon: {
    fontSize: '1.75rem',
    width: '2.5rem',
    color: '#d4996f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickFactContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  quickFactLabel: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#d4996f',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '0.5px',
  },
  quickFactValue: {
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  interestsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    padding: '1rem',
    width: '100%',
    height: '100%',
  },
  interestItemContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  interestItem: {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    WebkitTransition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    borderRadius: '1rem',
    backgroundColor: '#434a54',
  },
  cardFront: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    MozBackfaceVisibility: 'hidden',
    backgroundColor: '#434a54',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    WebkitTransform: 'rotateY(0)',
    transform: 'rotateY(0)',
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    MozBackfaceVisibility: 'hidden',
    backgroundColor: '#434a54',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'rotateY(180deg)',
    WebkitTransform: 'rotateY(180deg)',
    padding: '1rem',
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transform: 'translateZ(1px)',
  },
  interestIcon: {
    fontSize: '2rem',
    color: '#dcccbd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateZ(1px)',
  },
  interestLabel: {
    fontSize: '0.9rem',
    color: '#dcccbd',
    textAlign: 'center',
    transform: 'translateZ(1px)',
    fontFamily: 'Montserrat, sans-serif',
  },
  description: {
    color: '#dcccbd',
    fontSize: '0.75rem',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '1.2',
  },
};

export default AboutSection;
