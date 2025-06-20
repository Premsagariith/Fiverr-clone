const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

// POST: Send a message
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    const message = new Message({ senderId, receiverId, content });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET: All messages for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    }).sort({ timestamp: -1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Edit message
router.put('/:id', async (req, res) => {
  const { content } = req.body;
  try {
    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Message update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Message delete failed' });
  }
});


module.exports = router;