import React from 'react';
import { FaGithub, FaCalendar, FaLink, FaCode } from 'react-icons/fa';

function ProjectsSection() {
  const projects = [
    {
      title: 'Full-Stack (MERN) Personal Website',
      period: 'Jan 2025 - Present',
      website: 'www.alex-eugene-hunt.rocks',
      github: 'https://github.com/alex-eugene-hunt/MERN-FullStack-Website',
      description: [
        'Personal website created from scratch using Mongo, Express, React, and Node.js.',
        'Fine-tuned local LLM to answer personal questions about myself that users may want to know.',
        'Implemented nodemailer to create an email sending form to allow users to easily send me an email.',
        'Utilized MongoDB to include a playable Asteroids game that keeps a global leaderboard.'
      ],
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'LLM', 'Nodemailer']
    },
    {
      title: 'Meteorite Landings Data Mining Application',
      period: 'Aug 2024 - Dec 2024',
      organization: 'University of Oklahoma',
      github: 'https://github.com/alex-eugene-hunt/SoftwareProject-College-OU-CS5593',
      description: [
        'Developed a Python-based data mining application with advanced machine learning algorithms.',
        'Enabled accurate classification, discovering geographical hotspots for further scientific research.',
        'Needed to visualize and interpret meteorite distribution for non-technical stakeholders.',
        'Created clustering models leveraging coordinates and built a GUI for easy data exploration.'
      ],
      technologies: ['Python', 'Machine Learning', 'Data Mining', 'GUI Development', 'Data Visualization']
    },
    {
      title: 'ML Drone Flights',
      period: 'May 2024 - Aug 2024',
      github: 'https://github.com/alex-eugene-hunt/ML-Drone-Flights',
      description: [
        'Developed machine learning models to optimize drone flight paths and improve efficiency.',
        'Implemented computer vision algorithms for obstacle detection and navigation.',
        'Created a simulation environment for testing and training drone flight patterns.',
        'Achieved 30% improvement in flight efficiency through ML-optimized path planning.'
      ],
      technologies: ['Python', 'TensorFlow', 'Computer Vision', 'Drone API', 'Simulation']
    },
    {
      title: 'Diabetes Detection',
      period: 'Mar 2024 - May 2024',
      github: 'https://github.com/alex-eugene-hunt/Diabetes-Detection',
      description: [
        'Built a machine learning model to predict diabetes risk using patient health data.',
        'Implemented feature selection and preprocessing techniques to improve model accuracy.',
        'Developed a user-friendly web interface for healthcare professionals.',
        'Achieved 92% accuracy in early diabetes detection.'
      ],
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Healthcare Analytics', 'Data Preprocessing']
    },
    {
      title: 'Stroke Prediction',
      period: 'Jan 2024 - Mar 2024',
      github: 'https://github.com/alex-eugene-hunt/Stroke-Prediction',
      description: [
        'Created a neural network model for early stroke prediction using patient data.',
        'Implemented data balancing techniques to handle imbalanced medical datasets.',
        'Developed visualization tools for model interpretation.',
        'Achieved 88% sensitivity in identifying high-risk patients.'
      ],
      technologies: ['Python', 'TensorFlow', 'Neural Networks', 'Medical Data Analysis', 'Data Visualization']
    },
    {
      title: 'Remote Controlled Timer',
      period: 'Nov 2023 - Dec 2023',
      github: 'https://github.com/alex-eugene-hunt/Remote-Timer',
      description: [
        'Designed and built a remote-controlled timer system using Arduino.',
        'Implemented wireless communication protocols for remote operation.',
        'Created a mobile app interface for timer control.',
        'Added features for multiple timer presets and scheduling.'
      ],
      technologies: ['Arduino', 'C++', 'Mobile App Development', 'Wireless Communication', 'IoT']
    },
    {
      title: 'Score Prediction',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/Score-Prediction',
      description: [
        'Developed a machine learning model to predict sports game scores.',
        'Implemented data scraping to collect historical game data.',
        'Created an automated pipeline for model training and updating.',
        'Achieved 75% accuracy in predicting game outcomes.'
      ],
      technologies: ['Python', 'Machine Learning', 'Web Scraping', 'Data Analysis', 'Automation']
    },
    {
      title: 'TurtleBot',
      period: 'Jul 2023 - Aug 2023',
      github: 'https://github.com/alex-eugene-hunt/TurtleBot',
      description: [
        'Programmed a TurtleBot for autonomous navigation and mapping.',
        'Implemented SLAM algorithms for real-time mapping.',
        'Developed obstacle avoidance and path planning algorithms.',
        'Created a user interface for robot control and monitoring.'
      ],
      technologies: ['ROS', 'Python', 'SLAM', 'Robotics', 'Navigation Algorithms']
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      height: '100%',
      backgroundColor: '#021825',
      opacity: 0.8,
      background: 'linear-gradient(135deg, #434a5455 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #434a54 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #434a5455 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #434a54 25%, #021825 25%) 0px 0/ 20px 20px'
    }} id="projects">
      <div className="section-header">Projects</div>
      <section style={{
        padding: '2rem 0',
        minHeight: '100vh',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
            {projects.map((project, index) => (
              <div key={index} style={{
                backgroundColor: '#434a54',
                borderRadius: '1rem',
                border: '2px solid #dcccbd',
              }}>
                <div style={{
                  padding: '2rem',
                }}>
                  <div style={{
                    marginBottom: '1.5rem',
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      color: '#dcccbd',
                      marginBottom: '1rem',
                      fontFamily: 'Montserrat, sans-serif',
                    }}>{project.title}</h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                      marginBottom: '1rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#b14b32',
                        fontSize: '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                      }}>
                        <FaCalendar style={{
                          fontSize: '1.2rem',
                        }} />
                        <span>{project.period}</span>
                      </div>
                      {project.organization && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#b14b32',
                          fontSize: '1rem',
                          fontFamily: 'Montserrat, sans-serif',
                        }}>
                          <FaCode style={{
                            fontSize: '1.2rem',
                          }} />
                          <span>{project.organization}</span>
                        </div>
                      )}
                      {project.website && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#b14b32',
                          fontSize: '1rem',
                          fontFamily: 'Montserrat, sans-serif',
                        }}>
                          <FaLink style={{
                            fontSize: '1.2rem',
                          }} />
                          <a href={`https://${project.website}`} target="_blank" rel="noopener noreferrer" style={{
                            color: '#b14b32',
                            textDecoration: 'none',
                          }}>
                            {project.website}
                          </a>
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#b14b32',
                        fontSize: '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                      }}>
                        <FaGithub style={{
                          fontSize: '1.2rem',
                        }} />
                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                          color: '#b14b32',
                          textDecoration: 'none',
                        }}>
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.5rem 0',
                  }}>
                    {project.description.map((item, i) => (
                      <li key={i} style={{
                        color: '#dcccbd',
                        marginBottom: '0.75rem',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.6',
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} style={{
                        padding: '0.4rem 0.8rem',
                        backgroundColor: '#b14b32',
                        color: '#dcccbd',
                        borderRadius: '1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'Montserrat, sans-serif',
                      }}>
                        {tech}
                      </span>
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

export default ProjectsSection;
