import React, { useEffect } from 'react';
import { FaLinkedin, FaGithub, FaSlack, FaFacebook, FaInstagram } from 'react-icons/fa';
import './SocialSection.css';

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
      url: 'https://www.facebook.com/alex.e.hunt.3',
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/alex.e.hunt/',
    },
  ];

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item');
    
    const toggleSiblingClass = (items, index, offset, className, add) => {
      const sibling = items[index + offset];
      if (sibling) {
        if (add) {
          sibling.classList.add(className);
        } else {
          sibling.classList.remove(className);
        }
      }
    };

    navItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('hover');
        toggleSiblingClass(navItems, index, -1, 'sibling-close', true);
        toggleSiblingClass(navItems, index, 1, 'sibling-close', true);
        toggleSiblingClass(navItems, index, -2, 'sibling-far', true);
        toggleSiblingClass(navItems, index, 2, 'sibling-far', true);
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('hover');
        toggleSiblingClass(navItems, index, -1, 'sibling-close', false);
        toggleSiblingClass(navItems, index, 1, 'sibling-close', false);
        toggleSiblingClass(navItems, index, -2, 'sibling-far', false);
        toggleSiblingClass(navItems, index, 2, 'sibling-far', false);
      });
    });

    // Cleanup event listeners
    return () => {
      navItems.forEach((item, index) => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div style={{ 
      minHeight: 'auto', 
      height: '100%',
      backgroundColor: '#021825',
      backgroundImage: 'linear-gradient(135deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(225deg, rgba(67, 74, 84, 1) 25%, transparent 25%), linear-gradient(315deg, rgba(67, 74, 84, 0.33) 25%, transparent 25%), linear-gradient(45deg, rgba(67, 74, 84, 1) 25%, #021825 25%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '-10px 0, -10px 0, 0 0, 0 0',
      padding: '2rem 0'
    }} id="social">
      <div className="section-header">Connect</div>
      <div className="nav-wrap">
        <nav className="nav-bar">
          <ul className="nav-list">
            {socialLinks.map((social, index) => (
              <li key={index} className="nav-item">
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="nav-item__link">
                  <div className="icon-container">
                    <social.icon className="social-icon" />
                  </div>
                </a>
                <div className="nav-item__tooltip">
                  <div>{social.name}</div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SocialSection;
