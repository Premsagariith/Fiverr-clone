import { useEffect, useState } from 'react';
import {
  fetchMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
} from '../services/api';
import './Messages.css';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [userId, setUserId] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.id) setUserId(storedUser.id);

    fetchMessages()
      .then((res) => setMessages(res.data))
      .catch((err) => console.error('Fetch error', err));
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !receiverId) {
      alert('Please enter a message and select a receiver');
      return;
    }

    try {
      const res = await sendMessage({ content: input, receiverId });
      setMessages([...messages, res.data.data]);
      setInput('');
    } catch (err) {
      alert('❌ Failed to send message');
      console.error(err);
    }
  };

  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditContent(content);
    setActiveMenuId(null);
  };

  const handleEditSave = async (id) => {
    try {
      const res = await updateMessage(id, { content: editContent });
      setMessages((msgs) =>
        msgs.map((msg) =>
          msg._id === id ? { ...msg, content: res.data.content } : msg
        )
      );
      setEditingId(null);
      setEditContent('');
    } catch (err) {
      alert('❌ Failed to update message');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((msgs) => msgs.filter((msg) => msg._id !== id));
      setActiveMenuId(null);
    } catch (err) {
      alert('❌ Failed to delete message');
      console.error(err);
    }
  };

  return (
    <div className="messages-wrapper">
      <h2>📨 Messages</h2>

      <input
        type="text"
        placeholder="Enter receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className="receiver-input"
      />

      <ul className="message-list">
        {messages.map((msg) => {
          const isSender = msg.senderId === userId;
          return (
            <li
              key={msg._id}
              className={isSender ? 'sent' : 'received'}
              onClick={() => isSender && setActiveMenuId(msg._id)}
            >
              <strong>{isSender ? 'Me' : msg.senderId}:</strong>{' '}
              {editingId === msg._id ? (
                <>
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleEditSave(msg._id)}>💾</button>
                  <button onClick={() => setEditingId(null)}>❌</button>
                </>
              ) : (
                <>
                  {msg.content}
                  {isSender && activeMenuId === msg._id && (
                    <span className="msg-actions">
                      <button onClick={() => handleEdit(msg._id, msg.content)}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(msg._id)}>🗑️ Delete</button>
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>

      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
