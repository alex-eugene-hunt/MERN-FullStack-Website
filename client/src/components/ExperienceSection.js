import React, { useState, useEffect, useRef } from 'react';
import { FaBriefcase } from 'react-icons/fa';

function ExperienceSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(
        window.VANTA.WAVES({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x021825
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      location: 'San Francisco, CA',
      period: 'Jan 2022 - Present',
      description: 'Led development of full-stack applications using modern technologies.',
      responsibilities: [
        'Architected and implemented scalable web applications using React and Node.js',
        'Led a team of 5 developers and mentored junior engineers',
        'Improved application performance by 40% through optimization techniques',
        'Implemented CI/CD pipelines and automated testing procedures'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker']
    },
    {
      title: 'Software Engineer',
      company: 'Innovation Labs',
      location: 'Seattle, WA',
      period: 'Jun 2020 - Dec 2021',
      description: 'Developed and maintained enterprise-level web applications.',
      responsibilities: [
        'Built RESTful APIs using Node.js and Express',
        'Developed responsive front-end interfaces using React',
        'Implemented authentication and authorization systems',
        'Collaborated with UX designers to improve user experience'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Redis']
    }
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh' }}>
      <div className="section-header">Experience</div>
      <section id="experience" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.timeline}>
            {experiences.map((exp, index) => (
              <div key={index} style={styles.experienceCard}>
                <div style={styles.iconContainer}>
                  <FaBriefcase style={styles.icon} />
                </div>
                <div style={styles.content}>
                  <div style={styles.header}>
                    <h3 style={styles.title}>{exp.title}</h3>
                    <p style={styles.company}>{exp.company} - {exp.location}</p>
                    <p style={styles.period}>{exp.period}</p>
                  </div>
                  <p style={styles.description}>{exp.description}</p>
                  <div style={styles.responsibilitiesContainer}>
                    <h4 style={styles.subheading}>Key Responsibilities</h4>
                    <ul style={styles.list}>
                      {exp.responsibilities.map((responsibility, i) => (
                        <li key={i} style={styles.listItem}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={styles.technologiesContainer}>
                    <h4 style={styles.subheading}>Technologies Used</h4>
                    <div style={styles.techStack}>
                      {exp.technologies.map((tech, i) => (
                        <span key={i} style={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    padding: 0,
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#2d3436',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  experienceCard: {
    display: 'flex',
    gap: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    backgroundColor: '#007bff',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    color: '#ffffff',
    fontSize: '1.5rem',
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#2d3436',
    marginBottom: '0.5rem',
  },
  company: {
    fontSize: '1.25rem',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  period: {
    fontSize: '1rem',
    color: '#636e72',
  },
  description: {
    fontSize: '1rem',
    color: '#2d3436',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  subheading: {
    fontSize: '1.1rem',
    color: '#2d3436',
    marginBottom: '0.75rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '1.5rem',
  },
  listItem: {
    fontSize: '1rem',
    color: '#2d3436',
    marginBottom: '0.5rem',
    paddingLeft: '1.5rem',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '0.5rem',
      width: '6px',
      height: '6px',
      backgroundColor: '#007bff',
      borderRadius: '50%',
    },
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  techTag: {
    backgroundColor: '#e9ecef',
    color: '#2d3436',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.9rem',
  },
  responsibilitiesContainer: {
    marginBottom: '1.5rem',
  },
  technologiesContainer: {
    marginBottom: '1.5rem',
  },
};

export default ExperienceSection;
