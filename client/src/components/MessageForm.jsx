import { useState } from 'react';
import { sendMessage } from '../services/api';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ content: message, receiverId });
      alert('Message sent!');
      setMessage('');
      setReceiverId('');
    } catch (err) {
      alert('Failed to send message.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Receiver User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}
