import React, { useState, useEffect } from 'react';
import '@fontsource/faster-one';

function SendEmailForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      console.error('Name or message cannot be empty after trimming.');
      setSent(false);
      return;
    }
    try {
      const response = await fetch('https://mern-fullstack-website.onrender.com/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      });
      if (response.ok) {
        setSent(true);
        setName('');
        setMessage('');
        // Reset sent state after 3 seconds
        setTimeout(() => {
          setSent(false);
        }, 3000);
      } else {
        setSent(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSent(false);
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

  const styles = {
    container: {
      backgroundColor: '#b14b32',
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      padding: windowWidth <= 768 ? '0.75rem' : '1rem',
      borderRadius: '10px',
      color: '#fff',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    heading: {
      textAlign: 'center',
      margin: windowWidth <= 768 ? '0.25rem 0' : '0.5rem 0',
      fontSize: windowWidth <= 768 ? '1rem' : '1.2rem',
      color: '#dcccbd',
      fontFamily: '"Faster One", cursive',
      fontWeight: 'normal',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: windowWidth <= 768 ? '0.5rem' : '1rem',
      flex: 1,
      padding: windowWidth <= 768 ? '0.5rem' : '1rem',
    },
    input: {
      width: '100%',
      padding: windowWidth <= 768 ? '0.5rem' : '0.75rem',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#893a27',
      color: '#dcccbd',
      fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
      '::placeholder': {
        color: '#dcccbd80',
      },
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      flex: 1,
    },
    textarea: {
      width: '100%',
      flex: 1,
      minHeight: windowWidth <= 768 ? '100px' : '150px',
      padding: windowWidth <= 768 ? '0.5rem' : '0.75rem',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#893a27',
      color: '#dcccbd',
      fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
      resize: 'none',
      '::placeholder': {
        color: '#dcccbd80',
      },
    },
    button: {
      alignSelf: 'flex-end',
      padding: windowWidth <= 768 ? '0.5rem 1rem' : '0.75rem 1.5rem',
      backgroundColor: '#dcccbd',
      color: '#b14b32',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontFamily: '"Faster One", cursive',
      fontSize: windowWidth <= 768 ? '0.9rem' : '1rem',
      transition: 'transform 0.2s ease',
      ':hover': {
        transform: 'scale(1.05)',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>CONTACT ME</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => {
            console.log('Name input value:', e.target.value);
            setName(e.target.value);
          }}
          style={styles.input}
          pattern=".*"
          title="Any text is allowed, including spaces"
          required
        />
        <div style={styles.messageContainer}>
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => {
              console.log('Message input value:', e.target.value);
              setMessage(e.target.value);
            }}
            style={styles.textarea}
            pattern=".*"
            title="Any text is allowed, including spaces"
            required
          />
          <button type="submit" style={styles.button}>
            {sent ? '  ✔  ' : 'SEND?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendEmailForm;
