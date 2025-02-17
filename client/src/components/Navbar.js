import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'experience', 'education', 'projects', 'social'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the top
      const isAtTop = scrollPosition < 50;

      // Check if we're at the bottom of the page
      if ((window.innerHeight + window.scrollY) >= documentHeight - 50) {
        setActiveSection('social');
        return;
      }

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
      const offsetTop = element.offsetTop - 78;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">My Portfolio</div>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => scrollToSection('hero')}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About Me
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'resume' ? 'active' : ''}`}
              onClick={() => scrollToSection('resume')}
            >
              Resume
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => scrollToSection('experience')}
            >
              Experience
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => scrollToSection('education')}
            >
              Education
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-button ${activeSection === 'social' ? 'active' : ''}`}
              onClick={() => scrollToSection('social')}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;