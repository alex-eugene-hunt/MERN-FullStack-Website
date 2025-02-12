import React from 'react';

function AboutSection() {
  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>About Me</h2>
        <div style={styles.content}>
          <div style={styles.textContent}>
            <p style={styles.paragraph}>
              I'm Alex, a passionate software engineer with a deep love for creating innovative solutions 
              through code. My journey in software development has led me to specialize in full-stack 
              development using the MERN (MongoDB, Express.js, React, Node.js) stack.
            </p>
            <p style={styles.paragraph}>
              What drives me is the opportunity to solve complex problems and create meaningful user 
              experiences. When I'm not coding, you can find me exploring new technologies, contributing 
              to open-source projects, or working on personal projects that challenge my skills.
            </p>
            <div style={styles.skills}>
              <h3 style={styles.subheading}>Technical Skills</h3>
              <div style={styles.skillsList}>
                <span style={styles.skill}>JavaScript</span>
                <span style={styles.skill}>React.js</span>
                <span style={styles.skill}>Node.js</span>
                <span style={styles.skill}>MongoDB</span>
                <span style={styles.skill}>Express.js</span>
                <span style={styles.skill}>HTML/CSS</span>
                <span style={styles.skill}>Git</span>
                <span style={styles.skill}>RESTful APIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '6rem 2rem',
    backgroundColor: '#f8f9fa',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#2d3436',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  textContent: {
    flex: 1,
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#2d3436',
    marginBottom: '1.5rem',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#2d3436',
  },
  skills: {
    marginTop: '2rem',
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  skill: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
  },
};

export default AboutSection;
