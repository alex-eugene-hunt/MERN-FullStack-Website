import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import SocialSection from './components/SocialSection';
import './styles.css';

function App() {
  return (
    <div style={styles.container}>
      <HeroSection />
      <div style={styles.contentContainer}>
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SocialSection />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    width: '100%',
    minHeight: '100vh',
  },
  contentContainer: {
    backgroundColor: '#f8f9fa',
  }
};

export default App;