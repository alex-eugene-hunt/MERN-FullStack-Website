import React, { useState } from 'react';
import '@fontsource/faster-one';

function SendEmailForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) {
      console.error('Name or message cannot be empty after trimming.');
      setSent(false);
      return;
    }
    setIsSending(true);
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
    } finally {
      setIsSending(false);
    }
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
          title="Ask me anything!"
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
            title="Messages sent to alex.eugene.hunt@gmail.com"
            required
          />
          <button 
            type="submit" 
            style={{
              ...styles.button,
              backgroundColor: sent ? '#6aa84f' : '#b14b32',
              opacity: isSending ? 0.7 : 1,
              cursor: isSending ? 'not-allowed' : 'pointer'
            }}
            disabled={isSending}
          >
            {isSending ? '...' : sent ? '  ✔  ' : 'SEND'}
          </button>
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
  input: {
    backgroundColor: '#dcccbd',
    border: 'none',
    outline: 'none',
    padding: '0.4rem',
    marginBottom: '0.5rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    color: '#434a54',
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: '600',
  },
  messageContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    backgroundColor: '#dcccbd',
    border: 'none',
    outline: 'none',
    padding: '0.4rem',
    paddingBottom: '2.5rem',
    fontSize: '0.9rem',
    color: '#434a54',
    borderRadius: '10px 10px 30px 30px',
    flex: 1,
    resize: 'none',
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: '600',
  },
  button: {
    position: 'absolute',
    bottom: '0.5rem',
    right: '0.5rem',
    backgroundColor: '#b14b32',
    border: 'none',
    borderRadius: '10px 10px 25px 10px',
    padding: '0.6rem 1.2rem',
    cursor: 'pointer',
    fontSize: '1.1rem',
    color: '#dcccbd',
    fontFamily: '"Faster One", cursive',
    fontWeight: 'normal',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  '@media (max-width: 768px)': {
    button: {
      padding: '0.4rem 0.8rem',
      fontSize: '0.9rem',
    },
  },
};

export default SendEmailForm;
