import React from 'react';

function ExperienceSection() {
  return (
    <section id="experience" style={styles.section}>
      <h2>Experience & Education</h2>

      <div style={styles.experienceItem}>
        <h3>Software Engineer @ XYZ Company</h3>
        <p>Jan 2022 - Present</p>
        <p>Describe your role, responsibilities, achievements...</p>
      </div>

      <div style={styles.experienceItem}>
        <h3>Software Engineer Intern @ ABC Inc.</h3>
        <p>May 2021 - Aug 2021</p>
        <p>Key projects and learnings...</p>
      </div>

      <div style={styles.experienceItem}>
        <h3>B.S. in Computer Science</h3>
        <p>University of Example — Graduated 2021</p>
        <p>Honors, clubs, relevant coursework...</p>
      </div>

      {/* Add more items as needed */}
    </section>
  );
}

const styles = {
  section: {
    padding: '4rem 2rem',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  experienceItem: {
    marginBottom: '2rem',
  },
};

export default ExperienceSection;
