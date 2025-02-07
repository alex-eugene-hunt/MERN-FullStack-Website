import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'social'];
      const scrollPosition = window.scrollY;
      
      // Special handling for hero section
      if (scrollPosition < window.innerHeight / 2) {
        setActiveSection('hero');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
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