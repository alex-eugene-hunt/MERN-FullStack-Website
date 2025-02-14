import React, { useState, useEffect, useRef } from 'react';
import { FaDownload, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

function ResumeSection() {
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
      period: '2022 - Present',
      description: 'Led development of full-stack applications using MERN stack. Implemented CI/CD pipelines and mentored junior developers.',
      type: 'work'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client websites. Worked with React, Node.js, and MongoDB.',
      type: 'work'
    },
    {
      title: "Bachelor's in Computer Science",
      company: 'University Name',
      period: '2016 - 2020',
      description: 'Focused on software engineering and web development. Graduated with honors.',
      type: 'education'
    }
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh' }}>
      <div className="section-header">Resume</div>
      <section id="resume" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.downloadSection}>
            <a
              href="/path-to-your-resume.pdf"
              target="_blank"
              rel="noreferrer"
              style={styles.downloadButton}
            >
              <FaDownload style={styles.downloadIcon} />
              Download Resume
            </a>
          </div>

          <div style={styles.timeline}>
            {experiences.map((exp, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineIcon}>
                  {exp.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                </div>
                <div style={styles.timelineContent}>
                  <h3 style={styles.timelineTitle}>{exp.title}</h3>
                  <h4 style={styles.timelineCompany}>{exp.company}</h4>
                  <p style={styles.timelinePeriod}>{exp.period}</p>
                  <p style={styles.timelineDescription}>{exp.description}</p>
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
    backgroundColor: '#dcccbd',
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
  downloadSection: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  downloadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
  },
  downloadIcon: {
    marginRight: '0.5rem',
  },
  timeline: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0 auto',
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '3rem',
    position: 'relative',
  },
  timelineIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
    marginRight: '2rem',
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  timelineTitle: {
    fontSize: '1.25rem',
    color: '#2d3436',
    marginBottom: '0.5rem',
  },
  timelineCompany: {
    fontSize: '1.1rem',
    color: '#007bff',
    marginBottom: '0.5rem',
  },
  timelinePeriod: {
    fontSize: '0.9rem',
    color: '#636e72',
    marginBottom: '1rem',
  },
  timelineDescription: {
    fontSize: '1rem',
    color: '#2d3436',
    lineHeight: '1.6',
  },
};

export default ResumeSection;
