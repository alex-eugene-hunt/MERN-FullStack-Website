import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaCalendar, FaLink, FaCode } from 'react-icons/fa';

function ProjectsSection() {
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
    <div ref={vantaRef} style={{ minHeight: 'fit-content' }} id="projects">
      <div className="section-header">Projects</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} style={styles.projectCard}>
                <div style={styles.projectContent}>
                  <div style={styles.header}>
                    <h3 style={styles.title}>{project.title}</h3>
                    <div style={styles.projectInfo}>
                      <div style={styles.infoItem}>
                        <FaCalendar style={styles.icon} />
                        <span>{project.period}</span>
                      </div>
                      {project.organization && (
                        <div style={styles.infoItem}>
                          <FaCode style={styles.icon} />
                          <span>{project.organization}</span>
                        </div>
                      )}
                      {project.website && (
                        <div style={styles.infoItem}>
                          <FaLink style={styles.icon} />
                          <a href={`https://${project.website}`} target="_blank" rel="noopener noreferrer" style={styles.link}>
                            {project.website}
                          </a>
                        </div>
                      )}
                      <div style={styles.infoItem}>
                        <FaGithub style={styles.icon} />
                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={styles.link}>
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul style={styles.descriptionList}>
                    {project.description.map((item, i) => (
                      <li key={i} style={styles.descriptionItem}>{item}</li>
                    ))}
                  </ul>
                  <div style={styles.technologies}>
                    {project.technologies.map((tech, i) => (
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
  projectsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  projectCard: {
    backgroundColor: '#434a54',
    borderRadius: '1rem',
    border: '2px solid #dcccbd',
  },
  projectContent: {
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
  projectInfo: {
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
  },
  icon: {
    fontSize: '1.2rem',
  },
  link: {
    color: '#b14b32',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
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

export default ProjectsSection;
