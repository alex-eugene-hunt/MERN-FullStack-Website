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
      
      // Check if we're at the top
      setIsAtTop(scrollPosition < 50);

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
      const offsetTop = element.offsetTop - 78;
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