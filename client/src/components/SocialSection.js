import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaMedium } from 'react-icons/fa';

function SocialSection() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/your-profile',
      icon: <FaLinkedin />,
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/your-username',
      icon: <FaGithub />,
      color: '#333'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/your-username',
      icon: <FaTwitter />,
      color: '#1DA1F2'
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: <FaEnvelope />,
      color: '#EA4335'
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@your-username',
      icon: <FaMedium />,
      color: '#000000'
    }
  ];

  return (
    <div>
      <div className="section-header">Connect</div>
      <section id="social" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.socialGrid}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = social.color;
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ ...styles.icon, color: social.color }}>{social.icon}</span>
                <span style={styles.socialName}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    backgroundColor: '#d4996f',
    padding: '2rem 0',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#2d3436',
  },
  description: {
    textAlign: 'center',
    color: '#636e72',
    marginBottom: '3rem',
    fontSize: '1.1rem',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    justifyContent: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  socialLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '2rem',
    marginBottom: '1rem',
    transition: 'all 0.3s ease',
  },
  socialName: {
    color: '#2d3436',
    fontSize: '1.1rem',
    fontWeight: '500',
  },
};

export default SocialSection;
