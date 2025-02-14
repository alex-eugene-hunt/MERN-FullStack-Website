import React, { useState, useEffect, useRef } from 'react';
import { FaGuitar, FaBeer, FaHiking, FaGamepad, FaPlane, FaUtensils, FaCode, FaSkiing, FaFish, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake, FaUser } from 'react-icons/fa';
import AboutMe1 from '../assets/AboutMe_1.jpg';
import AboutMe2 from '../assets/AboutMe_2.jpeg';
import AboutMe3 from '../assets/AboutMe_3.jpeg';
import AboutMe4 from '../assets/AboutMe_4.jpg';
import AboutMe5 from '../assets/AboutMe_5.jpg';

function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const vantaRef = useRef(null);
  const photos = [AboutMe1, AboutMe2, AboutMe3, AboutMe4, AboutMe5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

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

  const interests = [
    { 
      icon: <FaGuitar />, 
      label: 'Guitar',
      description: 'I love playing folk and blues acoustic guitar. I have been playing for 15 years and enjoy both performing and composing.'
    },
    { 
      icon: <FaBeer />, 
      label: 'Craft Beer',
      description: 'I enjoy exploring local breweries and trying unique craft beers. IPAs and stouts are my favorites.'
    },
    { 
      icon: <FaHiking />, 
      label: 'Hiking',
      description: 'I frequently go hiking in the Pacific Northwest. My favorite trails are in the Olympic National Park.'
    },
    { 
      icon: <FaGamepad />, 
      label: 'Gaming',
      description: 'I\'m an avid gamer who enjoys both classic RPGs and modern indie games. Currently playing Baldur\'s Gate 3!'
    },
    { 
      icon: <FaPlane />, 
      label: 'Travel',
      description: 'I love exploring new cultures and places. I\'ve visited 25 countries and counting, with Japan being my favorite so far.'
    },
    { 
      icon: <FaUtensils />, 
      label: 'Cooking',
      description: 'I enjoy experimenting with different cuisines. Italian and Thai dishes are my specialty.'
    },
    { 
      icon: <FaCode />, 
      label: 'Coding',
      description: 'Beyond my day job, I love working on personal coding projects and contributing to open source.'
    },
    { 
      icon: <FaSkiing />, 
      label: 'Skiing',
      description: 'I\'m an avid skier and try to hit the slopes at least 10 times each season. Crystal Mountain is my home resort.'
    },
    { 
      icon: <FaFish />, 
      label: 'Fishing',
      description: 'I enjoy both freshwater and saltwater fishing. Nothing beats catching salmon in the Puget Sound!'
    },
  ];

  const handleCardClick = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const quickFacts = [
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'San Francisco, CA 94127' },
    { icon: <FaPhone />, label: 'Phone', value: '(405) 885-3808' },
    { icon: <FaEnvelope />, label: 'Email', value: 'alex.eugene.hunt@gmail.com' },
    { icon: <FaBirthdayCake />, label: 'Birthday', value: 'September 14th, 2000' },
    { icon: <FaUser />, label: 'Full Name', value: 'Alex Eugene Hunt' },
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh' }} id="about">
      <div className="section-header">About</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.gridContainer}>
            {/* Top Left - Slideshow */}
            <div style={styles.gridItem}>
              <div style={styles.slideshowContainer}>
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
            <div style={styles.gridItem}>
              <div style={{...styles.gridBox, backgroundColor: '#d4996f'}}>
                <div style={styles.bioContent}>
                  <p style={styles.paragraph}>
                    I'm Alex, a passionate software engineer with a deep love for creating innovative solutions 
                    through code. My journey in software development has led me to specialize in full-stack 
                    development using the MERN (MongoDB, Express.js, React, Node.js) stack.
                  </p>
                  <p style={styles.paragraph}>
                    What drives me is the opportunity to solve complex problems and create meaningful user 
                    experiences. When I'm not coding, you can find me exploring new technologies, contributing 
                    to open-source projects, or working on personal projects that challenge my skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Left - Quick Facts */}
            <div style={styles.gridItem}>
              <div style={{...styles.gridBox, backgroundColor: '#d4996f'}}>
                <div style={styles.quickFactsContainer}>
                  {quickFacts.map((fact, index) => (
                    <div key={index} style={styles.quickFactItem}>
                      <div style={styles.quickFactIcon}>{fact.icon}</div>
                      <div style={styles.quickFactContent}>
                        <div style={styles.quickFactLabel}>{fact.label}</div>
                        <div style={styles.quickFactValue}>{fact.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Right - Interest Icons */}
            <div style={styles.gridItem}>
              <div style={{...styles.gridBox, backgroundColor: '#b14b32'}}>
                <div style={styles.interestsGrid}>
                  {interests.map((interest, index) => (
                    <div key={index} style={styles.interestItemContainer}>
                      <div 
                        style={{
                          ...styles.interestItem,
                          transform: hoveredCard === index 
                            ? `translate3d(0, -5px, 0) scale3d(1.05, 1.05, 1) ${flippedCards[index] ? 'rotateY(180deg)' : ''}`
                            : flippedCards[index] ? 'rotateY(180deg)' : 'translate3d(0, 0, 0)',
                          boxShadow: hoveredCard === index ? '0 8px 16px rgba(0,0,0,0.2)' : 'none'
                        }}
                        onClick={() => handleCardClick(index)}
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div style={styles.cardFront}>
                          <div style={styles.contentWrapper}>
                            <div style={styles.interestIcon}>{interest.icon}</div>
                            <span style={styles.interestLabel}>{interest.label}</span>
                          </div>
                        </div>
                        <div style={styles.cardBack}>
                          <p style={styles.description}>{interest.description}</p>
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
    gridTemplateColumns: 'repeat(2, 450px)',
    gap: '2rem',
    width: '100%',
    justifyContent: 'center',
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '450px',
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
    gap: '1rem',
    width: '100%',
    padding: '1rem',
  },
  quickFactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: '#dcccbd',
  },
  quickFactIcon: {
    fontSize: '1.5rem',
    color: '#434a54',
    width: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  quickFactContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  quickFactLabel: {
    fontSize: '0.8rem',
    opacity: 0.8,
  },
  quickFactValue: {
    fontSize: '1rem',
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
    position: 'absolute',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    backgroundColor: '#434a54',
    borderRadius: '1rem',
  },
  cardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transform: 'translateZ(1px)',
  },
  cardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    transform: 'rotateY(180deg)',
    backgroundColor: '#434a54',
    borderRadius: '1rem',
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
  },
  description: {
    color: '#dcccbd',
    fontSize: '0.9rem',
    textAlign: 'center',
    lineHeight: '1.4',
  },
};

export default AboutSection;
