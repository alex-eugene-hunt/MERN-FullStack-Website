import React, { useState, useEffect } from 'react';
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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      height: '100%',
      backgroundColor: '#021825',
      backgroundImage: 'linear-gradient(135deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(225deg, rgba(67, 74, 84, 1) 25%, transparent 25%), linear-gradient(315deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(45deg, rgba(67, 74, 84, 1) 25%, #021825 25%)',
      backgroundSize: windowWidth <= 768 ? '10px 10px' : '20px 20px',
      backgroundPosition: '-10px 0, -10px 0, 0 0, 0 0'
    }} id="projects">
      <div className="section-header">Projects</div>
      <section style={{
        padding: windowWidth <= 768 ? '1rem 0' : '2rem 0',
        minHeight: '100vh',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: windowWidth <= 768 ? '0 1rem' : '0 2rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: windowWidth <= 768 ? '1rem' : '2rem',
          }}>
            {projects.map((project) => (
              <div key={project.github} style={{
                backgroundColor: '#434a54',
                borderRadius: '1rem',
                border: '2px solid #dcccbd',
              }}>
                <div style={{
                  padding: windowWidth <= 768 ? '1rem' : '2rem',
                  cursor: 'pointer',
                }} onClick={() => toggleProject(project.github)}>
                  <div style={{
                    marginBottom: windowWidth <= 768 ? '1rem' : '1.5rem',
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: windowWidth <= 768 ? 'column' : 'row',
                      justifyContent: 'space-between',
                      alignItems: windowWidth <= 768 ? 'flex-start' : 'center',
                      gap: windowWidth <= 768 ? '0.5rem' : '0',
                    }}>
                      <h3 style={{
                        fontSize: windowWidth <= 768 ? '1.2rem' : '1.5rem',
                        color: '#dcccbd',
                        marginBottom: windowWidth <= 768 ? '0.5rem' : '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }}>{project.title}</h3>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        color: '#dcccbd',
                        fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }}>
                        <span>README.md</span>
                        {openProject === project.github ? <FaChevronUp style={{ fontSize: '1.2rem' }} /> : <FaChevronDown style={{ fontSize: '1.2rem' }} />}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: windowWidth <= 768 ? 'column' : 'row',
                      flexWrap: 'wrap',
                      gap: windowWidth <= 768 ? '0.75rem' : '1.5rem',
                      marginBottom: '1rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#b14b32',
                        fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
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
                          color: '#b14b32',
                          fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 'bold',
                        }}>
                          <FaLink style={{
                            fontSize: '1.2rem',
                            color: '#dcccbd',
                          }} />
                          <span>{project.website}</span>
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#b14b32',
                        fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 'bold',
                      }}>
                        <FaGithub style={{
                          fontSize: '1.2rem',
                          color: '#dcccbd',
                        }} />
                        <span>{project.github.split('/').slice(-2).join('/')}</span>
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: windowWidth <= 768 ? '0.5rem' : '0.75rem',
                    }}>
                      {project.technologies.map((tech) => (
                        <span key={tech} style={{
                          backgroundColor: '#dcccbd',
                          color: '#434a54',
                          padding: windowWidth <= 768 ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
                          borderRadius: '1rem',
                          fontSize: windowWidth <= 768 ? '0.8rem' : '0.9rem',
                          fontFamily: 'Montserrat, sans-serif',
                          fontWeight: 'bold',
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {openProject === project.github && (
                    <div style={{
                      marginTop: '1rem',
                      padding: windowWidth <= 768 ? '0.75rem' : '1rem',
                      backgroundColor: '#333840',
                      borderRadius: '0.5rem',
                      fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
                      color: '#dcccbd',
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }}>
                      {readmeContents[project.github] ? (
                        <ReactMarkdown>{readmeContents[project.github]}</ReactMarkdown>
                      ) : (
                        <div>Loading README...</div>
                      )}
                    </div>
                  )}
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
