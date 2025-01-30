import React from 'react';

function AboutSection() {
  return (
    <section id="about" style={styles.section}>
      <h2>About Me</h2>
      <p>
        I'm Alex, a passionate software engineer. I enjoy building full-stack apps
        using MERN, and I'm always looking for new challenges.
      </p>
      {/* More details, background, interests, etc. */}
    </section>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
};

export default AboutSection;
