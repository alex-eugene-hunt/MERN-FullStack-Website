import React from 'react';

function LinkedInButton() {
  const linkedInUrl = 'https://www.linkedin.com/in/alex-eugene-hunt/';

  return (
    <a 
      href={linkedInUrl} 
      target="_blank" 
      rel="noreferrer noopener"
      style={{ textDecoration: 'none' }}
    >
      <button 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#0A66C2', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        View My LinkedIn
      </button>
    </a>
  );
}

export default LinkedInButton;