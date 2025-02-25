import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'resume', 'experience', 'education', 'projects', 'social'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the top
      setIsAtTop(scrollPosition < 50);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenuOpen(false); // Close mobile menu on resize
      // Update mobile state based on screen width
      if (window.innerWidth <= 1300) {
        document.body.style.overflow = 'auto'; // Ensure scrolling is enabled
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
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
    <div 
      className="navbar-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <nav className={`navbar ${isVisible || isAtTop ? 'visible' : ''}`}>
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
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

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
             onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            <button 
              className={`mobile-nav-button ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('hero');
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button 
              className={`mobile-nav-button ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('about');
                setIsMobileMenuOpen(false);
              }}
            >
              About Me
            </button>
            <button 
              className={`mobile-nav-button ${activeSection === 'resume' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('resume');
                setIsMobileMenuOpen(false);
              }}
            >
              Resume
            </button>
            <button 
              className={`mobile-nav-button ${activeSection === 'experience' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('experience');
                setIsMobileMenuOpen(false);
              }}
            >
              Experience
            </button>
            <button 
              className={`mobile-nav-button ${activeSection === 'education' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('education');
                setIsMobileMenuOpen(false);
              }}
            >
              Education
            </button>
            <button 
              className={`mobile-nav-button ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('projects');
                setIsMobileMenuOpen(false);
              }}
            >
              Projects
            </button>
            <button 
              className={`mobile-nav-button ${activeSection === 'social' ? 'active' : ''}`}
              onClick={() => {
                scrollToSection('social');
                setIsMobileMenuOpen(false);
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;