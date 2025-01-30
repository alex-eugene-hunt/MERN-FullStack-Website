// Example: client/src/pages/Home.js
import React from 'react';
import LinkedInButton from '../components/LinkedInButton';
import HeroSection from '../components/HeroSection'; // Adjust the path if needed

function Home() {
  return (
    <>
      <HeroSection />
      {/* You can add other sections below, like Projects, About, etc. */}
      <h1>Welcome to My Portfolio</h1>
      <p>Check out my projects and connect with me on LinkedIn!</p>
      <LinkedInButton />
    </>
  );
}

export default Home;