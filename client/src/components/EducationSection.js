import React from 'react';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import MSDegreeOU from '../assets/MS Degree - OU.jpg';
import BSDegreeOU from '../assets/BS Degree - OU.jpg';
import OUSeal from '../assets/oklahoma-sooners-seal.png';
import OULogo from '../assets/oklahoma-sooners-logo.png';
import SeedSowerOU from '../assets/SeedSower-OU.jpg';

function EducationSection() {
  const education = [
    {
      degree: 'Master of Computer Science',
      school: 'University of Oklahoma',
      location: 'Norman, OK',
      period: 'Jan 2024 - Dec 2024',
      gpa: '3.9 / 4.0',
      description: 'My Accelerated OU Master of Computer Science program covered the following curriculum: \n\n<strong>Summer Project:</strong> Improving Drone Flight Trajectories with Machine Learning.\n\n<strong>Paper Defense:</strong> "PyTond: Efficient Python Data Science on the Shoulders of Databases" - Hesam Shahrokhi, et. al.\n\n⦿ Algorithm Analysis\n⦿ Database Management Systems\n⦿ Computer Security \n⦿ PDN Programming \n⦿ Computer Architecture \n⦿ Machine Learning\n⦿ Cyber Attacks and Defenses\n⦿ Data Mining\n⦿ Computational Learning Theory\n⦿ Intelligent Data Analytics\n\nSkills: Robotics · Data Mining · Computer Security · Machine Learning'
    },
    {
      degree: 'Bachelor of Computer Science',
      school: 'University of Oklahoma',
      location: 'Norman, OK',
      period: 'Oct 2020 - Dec 2023',
      gpa: '3.83 / 4.0',
      description: 'My OU BS in Computer Science covered the following curriculum (general studies not listed):\n\nCS Courses:\n⦿ Programming Struc/Abstractions\n⦿ Data Structures\n⦿ Computer Organization\n⦿ Discrete Structures\n⦿ Intro to Operating Systems\n⦿ Software Engineering\n⦿ Princ-Programming Languages\n⦿ Artificial Intelligence\n⦿ Distributed Operating Systems\n⦿ Data Networks\n⦿ Capstone Design Project\n⦿ Algorithm Analysis\n⦿ Database Management Systems\n⦿ Computer Security\n⦿ PDN Programming\n\nSkills: Artificial Intelligence (AI) · Operating Systems · Software Development · Algorithm Analysis · Programming'
    }
  ];

  const formatDescription = (description, isMobile = false) => {
    if (isMobile) {
      // Remove curriculum introductions on mobile
      return description
        .replace('My Accelerated OU Master of Computer Science program covered the following curriculum: \n\n', '')
        .replace('My OU BS in Computer Science covered the following curriculum (general studies not listed):\n\nCS Courses:\n', '');
    }
    return description;
  };

  const renderDescription = (description) => {
    const lines = description.split('\n');
    return lines.filter(line => line.trim() && !line.includes('Skills:')).map((line, i) => (
      <li 
        key={i} 
        style={styles.descriptionItem} 
        className="description-item"
        dangerouslySetInnerHTML={{ __html: line }}
      />
    ));
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .description-item {
              padding-left: 0 !important;
            }
            .title {
              font-size: 1.2rem !important;
            }
            .top-logo {
              display: none !important;
            }
            .bottom-logo {
              width: 50px !important;
              height: 50px !important;
            }
            .technologies {
              margin: 0 !important;
              width: 100% !important;
              padding: 0 !important;
              display: flex !important;
              flex-wrap: wrap !important;
              gap: 0.5rem !important;
              justify-content: flex-start !important;
            }
            .tech-item {
              margin: 0 !important;
              flex-grow: 0 !important;
              flex-shrink: 0 !important;
            }
          }
        `}
      </style>
      <div style={{ 
        minHeight: '100vh', 
        height: '100%',
        backgroundColor: '#021825',
        backgroundImage: 'linear-gradient(135deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(225deg, rgba(67, 74, 84, 1) 25%, transparent 25%), linear-gradient(315deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(45deg, rgba(67, 74, 84, 1) 25%, #021825 25%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '-10px 0, -10px 0, 0 0, 0 0'
      }} id="education">
        <div className="section-header">Education</div>
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.timeline}>
              {education.map((edu, index) => (
                <div key={index}>
                  <div style={styles.timelineItem}>
                    {edu.school === 'University of Oklahoma' && (
                      <>
                        <img src={OUSeal} alt="OU Seal" style={styles.topLogo} className="top-logo" />
                        <img src={OULogo} alt="OU Logo" style={styles.bottomLogo} className="bottom-logo" />
                      </>
                    )}
                    <div style={styles.timelineContent}>
                      <div style={styles.header}>
                        <h3 style={styles.title} className="title">{edu.degree}</h3>
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
                            {renderDescription(formatDescription(edu.description, window.innerWidth <= 768))}
                          </ul>
                          <div style={styles.technologies} className="technologies">
                            {edu.description.split('\n')
                              .find(line => line.includes('Skills:'))
                              ?.split('Skills:')[1]
                              .split('·')
                              .map(skill => skill.trim())
                              .filter(skill => skill)
                              .map((skill, i) => (
                                <span key={i} style={styles.tech} className="tech-item">{skill}</span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {(edu.school === 'University of Oklahoma') && (
                    <div style={styles.imageGallery}>
                      <div style={styles.degreeImageContainer}>
                        <img 
                          src={edu.degree.startsWith('Master') ? MSDegreeOU : BSDegreeOU}
                          alt={`${edu.degree} from ${edu.school}`}
                          style={styles.degreeImage}
                        />
                      </div>
                      <div style={styles.sowerImageContainer}>
                        <img 
                          src={SeedSowerOU}
                          alt="OU Seed Sower"
                          style={styles.sowerImage}
                          className="sower-image"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
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
    overflow: 'hidden',
  },
  timelineContent: {
    flex: 1,
    padding: '2rem',
    position: 'relative',
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
    color: '#d4996f',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: "bold",
  },
  icon: {
    fontSize: '1.2rem',
    color: '#dcccbd',
  },
  imageGallery: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    marginTop: '2rem',
    width: '100%',
    alignItems: 'stretch',
  },
  degreeImageContainer: {
    width: 'calc(75% - 1rem)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sowerImageContainer: {
    width: 'calc(25% - 1rem)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '8px',
    border: '2px solid #dcccbd',
  },
  sowerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
    margin: '-0.3rem',
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
    fontWeight: 'bold',
  },
  topLogo: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '100px',
    height: 'auto',
    zIndex: 1,
  },
  bottomLogo: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    width: '100px',
    height: 'auto',
    zIndex: 1,
  },
};

const styleTag = document.createElement('style');
styleTag.textContent = `
  @media (max-width: 768px) {
    #education {
      overflow-x: hidden !important;
    }

    #education .container {
      padding: 0.5rem !important;
      max-width: 100% !important;
    }

    #education .timeline {
      gap: 1rem !important;
    }

    #education .timelineItem {
      flex-direction: column !important;
      border-radius: 0.75rem !important;
      border-width: 1px !important;
      margin: 0 0.5rem !important;
    }

    #education .timelineContent {
      padding: 1rem !important;
    }

    #education .title {
      font-size: 1.2rem !important;
      margin-bottom: 0.75rem !important;
    }

    #education .schoolInfo {
      gap: 0.75rem !important;
    }

    #education .infoItem {
      font-size: 0.8rem !important;
      gap: 0.25rem !important;
    }

    #education .icon {
      font-size: 1rem !important;
    }

    #education .imageGallery {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 0.35rem !important;
      margin-top: 0.5rem !important;
      padding: 0 0.5rem !important;
      width: 100% !important;
    }

    #education .degreeImageContainer,
    #education .sowerImageContainer {
      width: 100% !important;
      aspect-ratio: 16/9 !important;
    }

    #education .degreeImage,
    #education .sowerImage {
      width: 100% !important;
      height: 80px !important;
      object-fit: cover !important;
      border-radius: 4px !important;
      border-width: 1px !important;
    }

    #education .contentWrapper {
      flex-direction: column !important;
      gap: 1rem !important;
      align-items: center !important;
    }

    #education .mainContent {
      width: 100% !important;
    }

    #education .descriptionItem {
      font-size: 0.85rem !important;
      padding-left: 1rem !important;
      margin-bottom: 0.5rem !important;
      line-height: 1.4 !important;
    }

    #education .tech {
      font-size: 0.75rem !important;
      padding: 0.2rem 0.6rem !important;
      margin: 0.2rem !important;
    }

    #education .topLogo {
      width: 50px !important;
      top: 0.5rem !important;
      right: 0.5rem !important;
    }

    #education .bottomLogo {
      width: 50px !important;
      bottom: 0.5rem !important;
      right: 0.5rem !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default EducationSection;
