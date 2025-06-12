import React from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import CymSTARHQ from '../assets/CymSTAR_Employees_HQ.jpg';
import A10Aircraft from '../assets/Fairchild_Republic_A-10.jpg';

function ExperienceSection() {
  const experiences = [
    {
      title: 'Software Engineer I',
      company: 'CymSTAR LLC',
      location: 'Broken Arrow, OK',
      period: 'Feb 2024 - Dec 2024',
      description: [
        '⦿ Completing on-base installations of USAF aircraft simulations that help train pilots for first flights.'
        '⦿ Troubleshooting bugs and real time errors present in on-base installations including networking errors, software initialization, and various software applications needed to keep the trainers running for clients.'
        '⦿ Developed a tool to manage pipeline CI/CD testing, allowing for clients to easily test our installations, reducing the time needed to test simulation installations while on-base.'
        '⦿ Crafted a bid contracted out by the Department of Defense to create a tool that automatically containerised software projects with the use of artificial intelligence and large language models.'
        '⦿ Created an automatic Redmine ticket updater using GitLab\'s merge request API using C# and dotnet.'
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
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .badge-container {
              display: none !important;
            }
            .main-content {
              width: 100% !important;
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
            .timeline-container {
              display: flex;
              flex-direction: column;
            }
            .image-gallery {
              order: -1;
              margin-top: 0 !important;
              margin-bottom: 2rem !important;
            }
            .description-item {
              padding-left: 0 !important;
            }
            .container {
              padding-top: 0 !important;
            }
            .title {
              font-size: 1.2rem !important;
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
      }} id="experience">
        <div className="section-header">Experience</div>
        <section style={styles.section}>
          <div style={styles.container} className="container">
            <div className="timeline-container">
              <div style={styles.timeline}>
                {experiences.map((exp, index) => (
                  <div key={index} style={styles.timelineItem}>
                    <div style={styles.timelineContent}>
                      <div style={styles.header}>
                        <h3 style={styles.title} className="title">{exp.title}</h3>
                        <div style={styles.companyInfo}>
                          <div style={styles.infoItem}>
                            <FaBriefcase style={styles.icon} />
                            <a href="https://www.cymstar.com/" target="_blank" rel="noopener noreferrer" style={styles.companyLink}>
                              {exp.company}
                            </a>
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
                      <div style={styles.contentWrapper}>
                        <div style={styles.mainContent} className="main-content">
                          <ul style={styles.descriptionList}>
                            {exp.description.map((item, i) => (
                              <li key={i} style={styles.descriptionItem} className="description-item">{item}</li>
                            ))}
                          </ul>
                          <div style={styles.technologies} className="technologies">
                            {exp.technologies.map((tech, i) => (
                              <span key={i} style={styles.tech} className="tech-item">{tech}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.imageGallery} className="image-gallery">
                <img src={CymSTARHQ} alt="CymSTAR HQ" style={styles.galleryImage} />
                <img src={A10Aircraft} alt="A-10 Aircraft" style={styles.galleryImage} />
              </div>
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
    color: '#d4996f',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: "bold",
  },
  icon: {
    fontSize: '1.2rem',
    color: '#dcccbd',
  },
  companyLink: {
    color: '#d4996f',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#dcccbd',
    },
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
  contentWrapper: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-start',
  },
  mainContent: {
    flex: 1,
    '@media (max-width: 768px)': {
      width: '100%',
    },
  },
  imageGallery: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'space-between',
    marginTop: '2rem',
    width: '100%',
  },
  galleryImage: {
    width: 'calc(50% - 1rem)',
    height: 'auto',
    borderRadius: '8px',
    border: '2px solid #dcccbd',
    objectFit: 'cover',
  },
};

export default ExperienceSection;
