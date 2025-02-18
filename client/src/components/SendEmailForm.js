import React, { useState } from 'react';
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

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>CONTACT ME</h3>
      <style>
        {`
          input::placeholder, textarea::placeholder {
            color: #dcccbd !important;
            font-weight: bold !important;
          }
          input, textarea {
            font-weight: bold !important;
          }
        `}
      </style>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              console.log('Name input value:', e.target.value);
              setName(e.target.value);
            }}
            placeholder="Your name"
            style={{
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '2px solid #dcccbd',
              backgroundColor: '#434a54',
              color: '#dcccbd',
              fontSize: '1rem',
              fontFamily: 'Montserrat, sans-serif',
              width: '100%',
            }}
          />
          <div style={styles.messageContainer}>
            <textarea
              value={message}
              onChange={(e) => {
                console.log('Message input value:', e.target.value);
                setMessage(e.target.value);
              }}
              placeholder="Your message"
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '2px solid #dcccbd',
                backgroundColor: '#434a54',
                color: '#dcccbd',
                fontSize: '1rem',
                fontFamily: 'Montserrat, sans-serif',
                width: '100%',
                minHeight: '150px',
                resize: 'vertical',
              }}
            />
            <button type="submit" style={styles.button}>
              {sent ? '  ✔  ' : 'SEND?'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#b14b32',
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    padding: '0.5rem',
    borderRadius: '10px',
    color: '#fff',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    textAlign: 'center',
    margin: '0.5rem 0',
    fontSize: '1.2rem',
    color: '#dcccbd',
    fontFamily: '"Faster One", cursive',
    fontWeight: 'normal',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  messageContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    position: 'absolute',
    bottom: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#d4996f',
    border: 'none',
    borderRadius: '20px',
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#434a54',
    fontFamily: '"Montserrat", sans-serif',
  },
};

export default SendEmailForm;
