const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// POST a new job
router.post('/post', async (req, res) => {
  try {
    const { title, description, budget, clientId } = req.body;
    const job = new Job({ title, description, budget, clientId });
    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('clientId', 'name email');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;