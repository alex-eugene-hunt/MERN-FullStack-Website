import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const activeIndicatorRef = useRef(null);
  const buttonsRef = useRef({});
  const navLinksRef = useRef(null);

  useEffect(() => {
    const initializeActiveIndicator = () => {
      setTimeout(() => {
        updateActiveIndicator('hero');
      }, 100);
    };
    initializeActiveIndicator();
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'social'];
      const scrollPosition = window.scrollY;
      
      if (scrollPosition < window.innerHeight / 2) {
        setActiveSection('hero');
        updateActiveIndicator('hero');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
            updateActiveIndicator(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateActiveIndicator = (sectionId) => {
    const button = buttonsRef.current[sectionId];
    const navLinks = navLinksRef.current;
    
    if (button && activeIndicatorRef.current && navLinks) {
      const buttonRect = button.getBoundingClientRect();
      const navLinksRect = navLinks.getBoundingClientRect();
      
      // Calculate position relative to the navbar-links container
      const left = buttonRect.left - navLinksRect.left;
      const top = buttonRect.top - navLinksRect.top;
      
      activeIndicatorRef.current.style.transform = `translate(${left}px, ${top}px)`;
      activeIndicatorRef.current.style.width = `${buttonRect.width}px`;
      activeIndicatorRef.current.style.height = `${buttonRect.height}px`;
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      updateActiveIndicator(sectionId);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links" ref={navLinksRef}>
        <div className="active-indicator" ref={activeIndicatorRef}></div>
        {[
          { id: 'hero', text: 'Home' },
          { id: 'about', text: 'About Me' },
          { id: 'experience', text: 'Experience & Education' },
          { id: 'social', text: 'Social Media' }
        ].map(({ id, text }) => (
          <button
            key={id}
            ref={el => buttonsRef.current[id] = el}
            className={`nav-button ${activeSection === id ? 'active' : ''}`}
            onClick={() => scrollToSection(id)}
          >
            <span>{text}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;