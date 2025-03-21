import React, { useState } from 'react';
import { FaGithub, FaCalendar, FaLink, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

function ProjectsSection() {
  const [openProject, setOpenProject] = useState(null);
  const [readmeContents, setReadmeContents] = useState({});

  const projects = [
    {
      title: 'Full-Stack (MERN) Personal Website',
      period: 'Jan 2025 - Present',
      website: 'www.alex-eugene-hunt.rocks',
      github: 'https://github.com/alex-eugene-hunt/MERN-FullStack-Website',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'LLM', 'Nodemailer']
    },
    {
      title: 'Meteorite Landings Data Mining Application',
      period: 'Aug 2024 - Dec 2024',
      organization: 'University of Oklahoma',
      github: 'https://github.com/alex-eugene-hunt/Meteorite-Landings-Application',
      technologies: ['Python', 'Machine Learning', 'Data Mining', 'GUI Development', 'Data Visualization']
    },
    {
      title: 'ML Drone Flights',
      period: 'May 2024 - Aug 2024',
      github: 'https://github.com/alex-eugene-hunt/ML-Drone-Flights',
      technologies: ['Python', 'TensorFlow', 'Computer Vision', 'Drone API', 'Simulation']
    },
    {
      title: 'Diabetes Detection',
      period: 'Mar 2024 - May 2024',
      github: 'https://github.com/alex-eugene-hunt/Diabetes-Detection',
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Healthcare Analytics', 'Data Preprocessing']
    },
    {
      title: 'Stroke Prediction',
      period: 'Jan 2024 - Mar 2024',
      github: 'https://github.com/alex-eugene-hunt/Stroke-Prediction',
      technologies: ['Python', 'TensorFlow', 'Neural Networks', 'Medical Data Analysis', 'Data Visualization']
    },
    {
      title: 'Remote Controlled Timer',
      period: 'Nov 2023 - Dec 2023',
      github: 'https://github.com/alex-eugene-hunt/Arduino-RemoteControlTimer',
      technologies: ['Arduino', 'C++', 'Mobile App Development', 'Wireless Communication', 'IoT']
    },
    {
      title: 'Frozen Lake with Reinforcement Learning',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/FrozenLake-ReinforcementLearning',
      technologies: ['Python', 'Machine Learning', 'Web Scraping', 'Data Analysis', 'Automation']
    },
    {
      title: 'Score Prediction',
      period: 'Sep 2023 - Oct 2023',
      github: 'https://github.com/alex-eugene-hunt/College-Football-Score-Prediction',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Web Scraping', 'Automation']
    },
    {
      title: 'TurtleBot with Artificial Intelligence',
      period: 'Jul 2023 - Aug 2023',
      github: 'https://github.com/alex-eugene-hunt/Turtle-Bot-Robotics',
      technologies: ['ROS', 'Python', 'SLAM', 'Robotics', 'Navigation Algorithms']
    }
  ];

  const fetchReadmeContent = async (github) => {
    try {
      // Extract owner and repo from GitHub URL
      const [, , , owner, repo] = github.split('/');
      const apiUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('README not found');
      
      let content = await response.text();
      
      // Convert relative image paths to absolute GitHub URLs
      content = content.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        (match, alt, path) => {
          if (path.startsWith('http')) {
            return match; // Leave absolute URLs unchanged
          }
          // Convert relative path to absolute GitHub URL
          return `![${alt}](https://raw.githubusercontent.com/${owner}/${repo}/main/${path})`;
        }
      );

      setReadmeContents(prev => ({ ...prev, [github]: content }));
    } catch (error) {
      console.error('Error fetching README:', error);
      setReadmeContents(prev => ({ ...prev, [github]: 'README not found' }));
    }
  };

  const toggleProject = (github) => {
    if (openProject === github) {
      setOpenProject(null);
    } else {
      setOpenProject(github);
      if (!readmeContents[github]) {
        fetchReadmeContent(github);
      }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      height: '100%',
      backgroundColor: '#021825',
      backgroundImage: 'linear-gradient(135deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(225deg, rgba(67, 74, 84, 1) 25%, transparent 25%), linear-gradient(315deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(45deg, rgba(67, 74, 84, 1) 25%, #021825 25%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '-10px 0, -10px 0, 0 0, 0 0'
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
            {projects.map((project) => (
              <div key={project.github} style={{
                backgroundColor: '#434a54',
                borderRadius: '1rem',
                border: '2px solid #dcccbd',
              }}>
                <div style={{
                  padding: '2rem',
                  cursor: 'pointer',
                }} onClick={() => toggleProject(project.github)} className="project-content">
                  <div style={{
                    marginBottom: '1.5rem',
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <h3 style={{
                        fontSize: '1.5rem',
                        color: '#dcccbd',
                        marginBottom: '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }} className="project-title">{project.title}</h3>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1.5rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#d4996f',
                        fontSize: '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }}>
                        <FaCalendar style={{
                          fontSize: '1.2rem',
                          color: '#dcccbd',
                        }} />
                        <span>{project.period}</span>
                      </div>
                      {project.website && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#d4996f',
                          fontSize: '1rem',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 'bold',
                        }}>
                          <FaLink style={{
                            fontSize: '1.2rem',
                            color: '#dcccbd',
                          }} />
                          <a 
                            href={`https://${project.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{
                              color: '#d4996f',
                              textDecoration: 'none',
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.website}
                          </a>
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#d4996f',
                        fontSize: '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }}>
                        <FaGithub style={{
                          fontSize: '1.2rem',
                          color: '#dcccbd',
                        }} />
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{
                            color: '#d4996f',
                            textDecoration: 'none',
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub Project Link
                        </a>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginTop: '1rem',
                  }}>
                    {project.technologies.map((tech, index) => (
                      <span key={index} style={{
                        backgroundColor: '#b14b32',
                        color: '#dcccbd',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '1rem',
                        fontSize: '0.9rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }}>{tech}</span>
                    ))}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: '#dcccbd',
                    fontSize: '1rem',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    marginTop: '1rem',
                  }} className="readme-section">
                    <span>README.md</span>
                    {openProject === project.github ? <FaChevronUp style={{ fontSize: '1.2rem' }} /> : <FaChevronDown style={{ fontSize: '1.2rem' }} />}
                  </div>
                </div>
                
                {openProject === project.github && (
                  <div style={{
                    padding: '2rem',
                    borderTop: '2px solid #dcccbd',
                    backgroundColor: '#343a42',
                    borderBottomLeftRadius: '1rem',
                    borderBottomRightRadius: '1rem',
                  }}>
                    {readmeContents[project.github] ? (
                      <div style={{
                        color: '#dcccbd',
                        fontFamily: 'Montserrat, sans-serif',
                      }} className="prose prose-invert max-w-none">
                        <style>
                          {`
                            .prose img {
                              max-width: 100%;
                              height: auto;
                              display: block;
                              margin: 1.5rem auto;
                              border-radius: 8px;
                              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }
                            .prose ul {
                              list-style-type: disc;
                              padding-left: 2rem;
                              margin-top: 1rem;
                              margin-bottom: 1rem;
                            }
                            .prose li {
                              margin-top: 0.5rem;
                              margin-bottom: 0.5rem;
                            }
                            .prose h1, .prose h2, .prose h3, .prose h4 {
                              color: #dcccbd;
                              margin-top: 2rem;
                              margin-bottom: 1rem;
                            }
                            .prose p {
                              margin-top: 1rem;
                              margin-bottom: 1rem;
                            }
                            .prose code {
                              background-color: #2a2e35;
                              padding: 0.2rem 0.4rem;
                              border-radius: 0.25rem;
                              font-size: 0.875em;
                            }
                            .prose pre {
                              background-color: #2a2e35;
                              padding: 1rem;
                              border-radius: 0.5rem;
                              overflow-x: auto;
                              margin: 1.5rem 0;
                            }
                            .prose pre code {
                              background-color: transparent;
                              padding: 0;
                            }
                            .prose a {
                              color: #b14b32;
                              text-decoration: underline;
                            }
                            .prose a:hover {
                              color: #dcccbd;
                            }
                          `}
                        </style>
                        <ReactMarkdown>{readmeContents[project.github]}</ReactMarkdown>
                      </div>
                    ) : (
                      <div style={{
                        textAlign: 'center',
                        padding: '1rem 0',
                        color: '#dcccbd',
                        fontFamily: 'Montserrat, sans-serif',
                      }}>Loading README...</div>
                    )}
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

export default ProjectsSection;
