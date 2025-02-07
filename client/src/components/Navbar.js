import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'social'];
      const scrollPosition = window.scrollY + 100; // offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <button 
          className={`nav-button ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => scrollToSection('hero')}
        >
          Home
        </button>
        <button 
          className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
          onClick={() => scrollToSection('about')}
        >
          About Me
        </button>
        <button 
          className={`nav-button ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={() => scrollToSection('experience')}
        >
          Experience & Education
        </button>
        <button 
          className={`nav-button ${activeSection === 'social' ? 'active' : ''}`}
          onClick={() => scrollToSection('social')}
        >
          Social Media
        </button>
      </div>
    </nav>
  );
}

export default Navbar;