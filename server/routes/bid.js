const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');

// POST: Place a bid
router.post('/place', async (req, res) => {
  try {
    const { jobId, freelancerId, bidAmount, message } = req.body;
    const bid = new Bid({ jobId, freelancerId, bidAmount, message });
    await bid.save();
    res.status(201).json({ message: 'Bid placed successfully', bid });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: All bids
router.get('/', async (req, res) => {
  try {
    const bids = await Bid.find().populate('freelancerId jobId');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET: Get all bids for a specific job
router.get('/job/:jobId', async (req, res) => {
  try {
    const bids = await Bid.find({ jobId: req.params.jobId }).populate('freelancerId', 'name email');
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT: Accept a bid
router.put('/:id/accept', async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found' });

    bid.status = 'Accepted';
    await bid.save();

    res.json({ message: 'Bid accepted successfully', bid });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;