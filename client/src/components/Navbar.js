import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const activeIndicatorRef = useRef(null);
  const buttonsRef = useRef({});

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
    if (button && activeIndicatorRef.current) {
      const { offsetLeft, offsetTop, clientWidth, clientHeight } = button;
      activeIndicatorRef.current.style.left = `${offsetLeft}px`;
      activeIndicatorRef.current.style.top = `${offsetTop}px`;
      activeIndicatorRef.current.style.width = `${clientWidth}px`;
      activeIndicatorRef.current.style.height = `${clientHeight}px`;
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
      <div className="active-indicator" ref={activeIndicatorRef}></div>
      <div className="navbar-links">
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