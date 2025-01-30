import React from 'react';
import './Navbar.css'; // optional if you want separate CSS

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {/* Link to each section by its ID */}
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About Me</a></li>
        <li><a href="#experience">Experience & Education</a></li>
        <li><a href="#social">Social Media</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;