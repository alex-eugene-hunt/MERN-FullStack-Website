import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectsSection() {
  const projects = [
    {
      title: 'Personal Portfolio Website',
      description: 'A full-stack MERN portfolio website showcasing my projects and skills. Features include interactive components, email functionality, and responsive design.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
      github: 'https://github.com/yourusername/portfolio',
      liveDemo: 'https://your-portfolio-url.com',
      image: '/path-to-project-image.jpg',
    },
    // Add more projects as needed
  ];

  return (
    <section id="projects" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Projects</h2>
        <div style={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} style={styles.projectCard}>
              <div style={styles.imageContainer}>
                <img src={project.image} alt={project.title} style={styles.projectImage} />
                <div style={styles.overlay}>
                  <a href={project.github} target="_blank" rel="noreferrer" style={styles.iconLink}>
                    <FaGithub style={styles.icon} />
                  </a>
                  <a href={project.liveDemo} target="_blank" rel="noreferrer" style={styles.iconLink}>
                    <FaExternalLinkAlt style={styles.icon} />
                  </a>
                </div>
              </div>
              <div style={styles.projectContent}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectDescription}>{project.description}</p>
                <div style={styles.techStack}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} style={styles.techTag}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '6rem 2rem',
    backgroundColor: '#f8f9fa',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#2d3436',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    padding: '1rem',
  },
  projectCard: {
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundColor: '#e9ecef',
  },
  projectImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1,
    },
  },
  iconLink: {
    color: '#ffffff',
    fontSize: '1.5rem',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  icon: {
    fontSize: '2rem',
  },
  projectContent: {
    padding: '1.5rem',
  },
  projectTitle: {
    fontSize: '1.25rem',
    color: '#2d3436',
    marginBottom: '1rem',
  },
  projectDescription: {
    fontSize: '1rem',
    color: '#636e72',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  techTag: {
    backgroundColor: '#e9ecef',
    color: '#2d3436',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.9rem',
  },
};

export default ProjectsSection;
