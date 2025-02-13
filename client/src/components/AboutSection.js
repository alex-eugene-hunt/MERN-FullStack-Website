import React, { useState, useEffect } from 'react';
import { FaGuitar, FaBeer, FaGamepad, FaCamera, FaHiking, FaPlane, FaCode, FaBook, FaMusic } from 'react-icons/fa';
import AboutMe1 from '../assets/AboutMe_1.jpg';
import AboutMe2 from '../assets/AboutMe_2.jpeg';
import AboutMe3 from '../assets/AboutMe_3.jpeg';
import AboutMe4 from '../assets/AboutMe_4.jpg';
import AboutMe5 from '../assets/AboutMe_5.jpg';

function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = [AboutMe1, AboutMe2, AboutMe3, AboutMe4, AboutMe5];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [photos.length]);

  const interests = [
    { icon: <FaGuitar />, label: 'Music' },
    { icon: <FaBeer />, label: 'Craft Beer' },
    { icon: <FaGamepad />, label: 'Gaming' },
    { icon: <FaCamera />, label: 'Photography' },
    { icon: <FaHiking />, label: 'Hiking' },
    { icon: <FaPlane />, label: 'Travel' },
    { icon: <FaCode />, label: 'Coding' },
    { icon: <FaBook />, label: 'Reading' },
    { icon: <FaMusic />, label: 'Concerts' },
  ];

  return (
    <div>
      <div className="section-header">About</div>
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.leftColumn}>
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
                        backgroundColor: currentSlide === index ? '#007bff' : '#ccc',
                      }}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div style={styles.rightColumn}>
              <div style={styles.textContent}>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#2d3436',
  },
  content: {
    display: 'flex',
    gap: '4rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftColumn: {
    flex: '0 0 500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  slideshowContainer: {
    width: '500px',
    height: '500px',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
  textContent: {
    marginBottom: '2rem',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#2d3436',
    marginBottom: '1.5rem',
  },
  interestsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  interestItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  interestIcon: {
    fontSize: '2rem',
    color: '#007bff',
  },
  interestLabel: {
    fontSize: '0.9rem',
    color: '#2d3436',
    textAlign: 'center',
  },
};

export default AboutSection;
