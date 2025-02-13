import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'experience', 'education', 'projects', 'social'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if we're at the top
      setIsAtTop(scrollPosition < 50);

      // Special handling for hero section at the top
      if (scrollPosition < windowHeight / 3) {
        setActiveSection('hero');
        return;
      }

      // Calculate visibility percentage for each section
      let maxVisibility = 0;
      let mostVisibleSection = 'hero';

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const visibilityPercentage = visibleHeight / windowHeight;

          if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage;
            mostVisibleSection = sectionId;
          }
        }
      });

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 178;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="navbar-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <nav className={`navbar ${isVisible || isAtTop ? 'visible' : ''}`}>
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
            className={`nav-button ${activeSection === 'resume' ? 'active' : ''}`}
            onClick={() => scrollToSection('resume')}
          >
            Resume
          </button>
          <button 
            className={`nav-button ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => scrollToSection('experience')}
          >
            Experience
          </button>
          <button 
            className={`nav-button ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => scrollToSection('education')}
          >
            Education
          </button>
          <button 
            className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => scrollToSection('projects')}
          >
            Projects
          </button>
          <button 
            className={`nav-button ${activeSection === 'social' ? 'active' : ''}`}
            onClick={() => scrollToSection('social')}
          >
            Contact
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;