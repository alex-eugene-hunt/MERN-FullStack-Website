import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ResumeSection from './components/ResumeSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import SocialSection from './components/SocialSection';
import AdminDashboard from './components/AdminDashboard';
import './styles.css';

function App() {
  return (
    <Router>
      <div style={{ margin: 0, padding: 0, width: '100%', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={
            <div style={{ backgroundColor: '#f8f9fa' }}>
              <HeroSection />
              <AboutSection />
              <ResumeSection />
              <ExperienceSection />
              <EducationSection />
              <ProjectsSection />
              <SocialSection />
            </div>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;