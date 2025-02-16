import React from 'react';
import { FaDownload } from 'react-icons/fa';
import Resume from '../assets/AlexHunt_Resume.pdf';

function ResumeSection() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      height: '100%',
      backgroundColor: '#021825',
      opacity: 0.8,
      background: 'linear-gradient(135deg, #434a5455 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #434a54 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #434a5455 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #434a54 25%, #021825 25%) 0px 0/ 20px 20px'
    }} id="resume">
      <div className="section-header">Resume</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.downloadSection}>
            <a
              href={Resume}
              download="AlexHunt_Resume.pdf"
              style={styles.downloadButton}
            >
              <FaDownload style={styles.downloadIcon} />
              Download Resume
            </a>
          </div>

          <div style={styles.resumeContainer}>
            <img 
              src={require('../assets/AlexHunt_Resume.jpg')} 
              alt="Resume"
              style={styles.resumeImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    padding: 0,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },
  downloadSection: {
    //marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  downloadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#b14b32',
    color: '#dcccbd',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'all 0.3s ease',
    border: '2px solid #dcccbd',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#434a54',
      transform: 'translateY(-2px)',
    },
  },
  downloadIcon: {
    fontSize: '1.2rem',
  },
  resumeContainer: {
    width: '100%',
    maxWidth: '850px',
    display: 'flex',
    justifyContent: 'center',
    border: '2px solid #dcccbd',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundColor: '#434a54',
  },
  resumeImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
};

export default ResumeSection;
