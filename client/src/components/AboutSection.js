import React, { useState, useEffect } from 'react';
import { FaGuitar, FaBeer, FaHiking, FaGamepad, FaPlane, FaUtensils, FaCode, FaSkiing, FaFish, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import AboutMe1 from '../assets/AboutMe_1.jpg';
import AboutMe2 from '../assets/AboutMe_2.jpeg';
import AboutMe3 from '../assets/AboutMe_3.jpeg';
import AboutMe4 from '../assets/AboutMe_4.jpg';
import AboutMe5 from '../assets/AboutMe_5.jpg';

function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = [AboutMe1, AboutMe2, AboutMe3, AboutMe4, AboutMe5];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  const interests = [
    { icon: <FaGuitar />, label: 'Guitar' },
    { icon: <FaBeer />, label: 'Craft Beer' },
    { icon: <FaHiking />, label: 'Hiking' },
    { icon: <FaGamepad />, label: 'Gaming' },
    { icon: <FaPlane />, label: 'Travel' },
    { icon: <FaUtensils />, label: 'Cooking' },
    { icon: <FaCode />, label: 'Coding' },
    { icon: <FaSkiing />, label: 'Skiing' },
    { icon: <FaFish />, label: 'Fishing' },
  ];

  const quickFacts = [
    { icon: <FaMapMarkerAlt />, label: 'Address', value: 'Seattle, WA 98101' },
    { icon: <FaPhone />, label: 'Phone', value: '(206) 555-0123' },
    { icon: <FaEnvelope />, label: 'Email', value: 'alex.hunt@example.com' },
  ];

  return (
    <div>
      <div className="section-header">About</div>
      <section id="about" style={styles.section}>
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
              <div style={styles.gridBox}>
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
              <div style={styles.gridBox}>
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
              <div style={styles.interestsGrid}>
                {interests.map((interest, index) => (
                  <div key={index} style={styles.interestItem}>
                    <div style={styles.interestIcon}>{interest.icon}</div>
                    <span style={styles.interestLabel}>{interest.label}</span>
                  </div>
                ))}
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
    backgroundColor: '#d4996f',
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
  },
  quickFactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem',
    borderRadius: '10px',
  },
  quickFactIcon: {
    fontSize: '1.25rem',
    color: '#b14b32',
  },
  quickFactContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  quickFactLabel: {
    fontSize: '0.8rem',
    color: '#b14b32',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  },
  quickFactValue: {
    fontSize: '0.8rem',
    color: '#dcccbd',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  },
  interestsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    width: '450px',
    height: '450px',
    padding: '2rem',
    borderRadius: '2.25rem',
  },
  interestItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    backgroundColor: '#434a54',
    borderRadius: '1rem',
    aspectRatio: '1',
    padding: '1rem',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  interestIcon: {
    fontSize: '2.5rem',
    color: '#b14b32',
  },
  interestLabel: {
    fontSize: '0.9rem',
    color: '#b14b32',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
  },
};

export default AboutSection;
