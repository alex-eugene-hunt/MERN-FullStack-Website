import React from 'react';
import { FaLinkedin, FaGithub, FaSlack, FaFacebook, FaInstagram } from 'react-icons/fa';

function SocialSection() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/alex-eugene-hunt/',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/alex-eugene-hunt',
    },
    {
      name: 'Slack',
      icon: FaSlack,
      url: 'https://yourslack.slack.com',
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: 'https://www.facebook.com/yourusername',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/yourusername',
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      height: '100%',
      backgroundColor: '#021825',
      backgroundImage: 'linear-gradient(135deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(225deg, rgba(67, 74, 84, 1) 25%, transparent 25%), linear-gradient(315deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(45deg, rgba(67, 74, 84, 1) 25%, #021825 25%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '-10px 0, -10px 0, 0 0, 0 0'
    }} id="social">
      <div className="section-header">Connect</div>
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.socialGrid}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
              >
                <div style={styles.iconContainer}>
                  <social.icon style={styles.icon} />
                </div>
                <span style={styles.label}>{social.name}</span>
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
    padding: '2rem 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  socialGrid: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    padding: '2rem 0',
  },
  socialLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '1rem',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  },
  iconContainer: {
    width: '80px',
    height: '80px',
    backgroundColor: '#434a54',
    border: '2px solid #dcccbd',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  icon: {
    fontSize: '2rem',
    color: '#dcccbd',
  },
  label: {
    color: '#dcccbd',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
  },
};

export default SocialSection;
