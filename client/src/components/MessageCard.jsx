// src/components/MessageCard.jsx
import React from 'react';

const MessageCard = ({ message, sender, timestamp }) => {
  return (
    <div style={styles.card}>
      <div style={styles.sender}><strong>{sender}</strong></div>
      <div style={styles.message}>{message}</div>
      <div style={styles.timestamp}>{new Date(timestamp).toLocaleString()}</div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
  },
  sender: {
    color: '#333',
    marginBottom: '4px'
  },
  message: {
    color: '#555'
  },
  timestamp: {
    fontSize: '12px',
    color: '#999',
    marginTop: '5px'
  }
};

export default MessageCard;
