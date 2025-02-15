import React, { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import MSDegreeOU from '../assets/MS Degree - OU.jpg';
import BSDegreeOU from '../assets/BS Degree - OU.jpg';

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
      gpa: null,
      description: 'My Accelerated Master of Information and Data Science program covers the following curriculum: \n\n⦿ Introduction to Data Science Programming\n⦿ Research Design and Applications for Data and Analysis\n⦿ Statistics for Data Science\n\nI am still studying here and will update as needed. Skills: Data Science · Data Analysis · Statistical Data Analysis'
    },
    {
      degree: 'Master of Computer Science',
      school: 'University of Oklahoma',
      location: 'Norman, OK',
      period: 'Jan 2024 - Dec 2024',
      gpa: '3.9 / 4.0',
      description: 'My Accelerated OU Master of Computer Science program covered the following curriculum: \n\nSummer Project: Improving Drone Flight Trajectories with Machine Learning.\n\nPaper Defense: "PyTond: Efficient Python Data Science on the Shoulders of Databases" - Hesam Shahrokhi, et. al.\n\n⦿ Algorithm Analysis\n⦿ Database Management Systems\n⦿ Computer Security \n⦿ PDN Programming \n⦿ Computer Architecture \n⦿ Machine Learning\n⦿ Cyber Attacks and Defenses\n⦿ Data Mining\n⦿ Computational Learning Theory\n⦿ Intelligent Data Analytics\n\nSkills: Robotics · Data Mining · Computer Security · Machine Learning · Databases'
    },
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Oklahoma',
      location: 'Norman, OK',
      period: 'Oct 2020 - Dec 2023',
      gpa: '3.83 / 4.0',
      description: 'My OU BS in Computer Science covered the following curriculum (general studies not listed):\n\nCS Courses:\n⦿ Programming Struc/Abstractions\n⦿ Data Structures\n⦿ Computer Organization\n⦿ Discrete Structures\n⦿ Intro to Operating Systems\n⦿ Software Engineering\n⦿ Princ-Programming Languages\n⦿ Artificial Intelligence\n⦿ Distributed Operating Systems\n⦿ Data Networks\n⦿ Capstone Design Project\n⦿ Algorithm Analysis\n⦿ Database Management Systems\n⦿ Computer Security\n⦿ PDN Programming\n\nSkills: Artificial Intelligence (AI) · Operating Systems · Software Development · Algorithm Analysis · Algorithms · Programming'
    }
  ];

  return (
    <div ref={vantaRef} style={{ minHeight: 'fit-content' }} id="education">
      <div className="section-header">Education</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.timeline}>
            {education.map((edu, index) => (
              <div key={index}>
                <div style={styles.timelineItem}>
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
                    <div style={styles.contentWrapper}>
                      <div style={styles.mainContent}>
                        <ul style={styles.descriptionList}>
                          {edu.description.split('\n').filter(line => line.trim() && !line.includes('Skills:')).map((line, i) => (
                            <li key={i} style={styles.descriptionItem}>{line}</li>
                          ))}
                        </ul>
                        <div style={styles.technologies}>
                          {edu.description.split('\n')
                            .find(line => line.includes('Skills:'))
                            ?.split('Skills:')[1]
                            .split('·')
                            .map(skill => skill.trim())
                            .filter(skill => skill)
                            .map((skill, i) => (
                              <span key={i} style={styles.tech}>{skill}</span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {(edu.school === 'University of Oklahoma') && (
                  <div style={styles.degreeImageContainer}>
                    <img 
                      src={edu.degree.startsWith('Master') ? MSDegreeOU : BSDegreeOU}
                      alt={`${edu.degree} from ${edu.school}`}
                      style={styles.degreeImage}
                    />
                  </div>
                )}
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
    fontWeight: "bold",
  },
  icon: {
    fontSize: '1.2rem',
  },
  degreeImageContainer: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  degreeImage: {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    borderRadius: '8px',
    border: '2px solid #dcccbd',
  },
  contentWrapper: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
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
    backgroundColor: '#b14b32',
    color: '#dcccbd',
    padding: '0.3rem 0.8rem',
    borderRadius: '1rem',
    fontSize: '0.9rem',
    margin: '0.3rem',
    display: 'inline-block',
    fontFamily: 'Montserrat, sans-serif',
  },
};

export default EducationSection;
