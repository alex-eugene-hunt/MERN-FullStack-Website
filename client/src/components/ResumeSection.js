import React, { useState, useEffect, useRef } from 'react';
import { FaDownload } from 'react-icons/fa';
import Resume from '../assets/AlexHunt_Resume.pdf';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(850);

  useEffect(() => {
    function handleResize() {
      const width = Math.min(850, window.innerWidth - 40);
      setPageWidth(width);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
            <Document
              file={Resume}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div style={styles.loading}>Loading Resume...</div>}
            >
              <Page 
                pageNumber={1} 
                width={pageWidth}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
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
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
  },
  loading: {
    color: '#dcccbd',
    fontSize: '1.2rem',
    fontFamily: 'Montserrat, sans-serif',
    padding: '2rem',
  },
};

export default ResumeSection;
