import React, { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

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
      title: 'Software Engineer Intern',
      company: 'CymSTAR LLC',
      location: 'Broken Arrow, OK',
      period: 'Feb 2024 - Dec 2024',
      description: [
        '⦿ Designed Docker and Podman containers to streamline the deployment process, reducing 70% of deployment overhead by eliminating configuration conflicts.',
        '⦿ Addressed existing CI/CD bugs and developed GitLab Pipelines to improve automation, decreasing build times by 80% and significantly enhanced code reliability.',
        '⦿ Configured and managed GitLab Runners to enable parallel and efficient builds.',
        '⦿ Shortened feedback loops by 50%, allowing quicker iteration and continuous integration.',
        '⦿ Implemented integration and unit testing frameworks in Python and C++ to ensure reliability in large codebases.',
        '⦿ Created an automatic Redmine ticket updater using GitLab\'s merge request API using C# and dotnet.'
      ],
      technologies: ['Docker', 'Podman', 'GitLab CI/CD', 'Python', 'C++', 'C#', '.NET', 'Unit Testing']
    }
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: 'fit-content' }} id="experience">
      <div className="section-header">Experience</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.timeline}>
            {experiences.map((exp, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineContent}>
                  <div style={styles.header}>
                    <h3 style={styles.title}>{exp.title}</h3>
                    <div style={styles.companyInfo}>
                      <div style={styles.infoItem}>
                        <FaBriefcase style={styles.icon} />
                        <span>{exp.company}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <FaMapMarkerAlt style={styles.icon} />
                        <span>{exp.location}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <FaCalendar style={styles.icon} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <ul style={styles.descriptionList}>
                    {exp.description.map((item, i) => (
                      <li key={i} style={styles.descriptionItem}>{item}</li>
                    ))}
                  </ul>
                  <div style={styles.technologies}>
                    {exp.technologies.map((tech, i) => (
                      <span key={i} style={styles.tech}>{tech}</span>
                    ))}
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
    padding: '2rem 0',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  timelineItem: {
    display: 'flex',
    position: 'relative',
    backgroundColor: '#434a54',
    borderRadius: '1rem',
    border: '2px solid #dcccbd',
  },
  timelineContent: {
    flex: 1,
    padding: '2rem',
  },
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#dcccbd',
    marginBottom: '1rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  companyInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '1rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#b14b32',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: "bold",
  },
  icon: {
    fontSize: '1.2rem',
  },
  descriptionList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 1.5rem 0',
  },
  descriptionItem: {
    color: '#dcccbd',
    marginBottom: '0.75rem',
    paddingLeft: '1.5rem',
    position: 'relative',
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: '1.6',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '0.6em',
      width: '6px',
      height: '6px',
      backgroundColor: '#b14b32',
      borderRadius: '50%',
    },
  },
  technologies: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  tech: {
    padding: '0.4rem 0.8rem',
    backgroundColor: '#b14b32',
    color: '#dcccbd',
    borderRadius: '1rem',
    fontSize: '0.9rem',
    fontFamily: 'Montserrat, sans-serif',
  },
};

export default ExperienceSection;
