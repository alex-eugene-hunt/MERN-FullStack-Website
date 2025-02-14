import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaGithub, FaSlack, FaFacebook, FaInstagram } from 'react-icons/fa';

function SocialSection() {
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
    <div ref={vantaRef} style={{ minHeight: 'fit-content' }} id="connect">
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
