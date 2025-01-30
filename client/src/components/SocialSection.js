import React from 'react';

function SocialSection() {
  return (
    <section id="social" style={styles.section}>
      <h2>Connect With Me</h2>
      <ul style={styles.socialList}>
        <li>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/your-username" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://twitter.com/your-username" target="_blank" rel="noreferrer">
            Twitter
          </a>
        </li>
        {/* Add more socials as needed */}
      </ul>
    </section>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  socialList: {
    listStyle: 'none',
    padding: 0,
  },
};

export default SocialSection;
