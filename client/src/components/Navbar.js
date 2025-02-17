import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'experience', 'education', 'projects', 'social'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setIsAtTop(scrollPosition < 50);

      if ((window.innerHeight + window.scrollY) >= documentHeight - 50) {
        setActiveSection('social');
        return;
      }

      if (scrollPosition < windowHeight / 3) {
        setActiveSection('hero');
        return;
      }

      let maxVisibility = 0;
      let mostVisibleSection = 'hero';

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const visibilityPercentage = visibleHeight / element.offsetHeight;

          if (visibilityPercentage > maxVisibility) {
            maxVisibility = visibilityPercentage;
            mostVisibleSection = sectionId;
          }
        }
      });

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 78;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div 
      className="navbar-container"
      onMouseEnter={() => !isMobile && setIsVisible(true)}
      onMouseLeave={() => !isMobile && setIsVisible(false)}
    >
      <nav className={`navbar ${isVisible || isAtTop || isMobileMenuOpen ? 'visible' : ''}`}>
        {isMobile && (
          <button className="hamburger-menu" onClick={toggleMobileMenu}>
            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        )}
        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''} ${isMobile ? 'mobile' : ''}`}>
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
            Social
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;