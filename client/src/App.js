import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SocialSection from './components/SocialSection';
import './styles.css';  // Where we have html { scroll-behavior: smooth; } etc.

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SocialSection />
    </div>
  );
}

export default App;