import React, { useState, useEffect, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import Resume from '../assets/AlexHunt_Resume.pdf';

function ResumeSection() {
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

  return (
    <div ref={vantaRef} style={{ minHeight: '100vh' }} id="resume">
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

          <div style={styles.pdfContainer}>
            <iframe
              src={Resume}
              style={styles.pdfViewer}
              title="Resume PDF"
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
    marginBottom: '2rem',
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
  pdfContainer: {
    width: '100%',
    maxWidth: '850px',
    height: '1100px',
    border: '2px solid #dcccbd',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundColor: '#434a54',
  },
  pdfViewer: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
};

export default ResumeSection;
