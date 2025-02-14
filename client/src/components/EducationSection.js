import React, { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

function EducationSection() {
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

  const education = [
    {
      degree: 'Master of Information and Data Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      period: 'Jan 2025 - (Dec 2025)',
      gpa: null
    },
    {
      degree: 'Master of Computer Science',
      school: 'University of Oklahoma',
      location: 'Norman, OK',
      period: 'Jan 2024 - Dec 2024',
      gpa: '3.9 / 4.0'
    },
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Oklahoma',
      location: 'Norman, OK',
      period: 'Oct 2020 - Dec 2023',
      gpa: '3.83 / 4.0'
    }
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: 'fit-content' }} id="education">
      <div className="section-header">Education</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.timeline}>
            {education.map((edu, index) => (
              <div key={index} style={styles.timelineItem}>
                <div style={styles.timelineContent}>
                  <div style={styles.header}>
                    <h3 style={styles.title}>{edu.degree}</h3>
                    <div style={styles.schoolInfo}>
                      <div style={styles.infoItem}>
                        <FaGraduationCap style={styles.icon} />
                        <span>{edu.school}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <FaMapMarkerAlt style={styles.icon} />
                        <span>{edu.location}</span>
                      </div>
                      <div style={styles.infoItem}>
                        <FaCalendar style={styles.icon} />
                        <span>{edu.period}</span>
                      </div>
                      {edu.gpa && (
                        <div style={styles.infoItem}>
                          <FaStar style={styles.icon} />
                          <span>GPA: {edu.gpa}</span>
                        </div>
                      )}
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
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    color: '#dcccbd',
    marginBottom: '1rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  schoolInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#b14b32',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
  },
  icon: {
    fontSize: '1.2rem',
  }
};

export default EducationSection;
