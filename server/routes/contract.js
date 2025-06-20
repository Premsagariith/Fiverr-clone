const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

// Create a contract when a client accepts a bid
router.post('/create', async (req, res) => {
    try {
        const { jobId, clientId, freelancerId, bidId } = req.body;

        const contract = new Contract({ jobId, clientId, freelancerId, bidId });
        await contract.save();

        res.status(201).json({ message: 'Contract created successfully', contract });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Freelancer marks the job as completed
router.put('/mark-completed/:contractId', async (req, res) => {
    try {
        const { contractId } = req.params;

        const contract = await Contract.findByIdAndUpdate(contractId, { status: 'completed' }, { new: true });
        res.json({ message: 'Job marked as completed', contract });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Client approves the work
router.put('/approve/:contractId', async (req, res) => {
    try {
        const { contractId } = req.params;

        const contract = await Contract.findByIdAndUpdate(contractId, { status: 'approved' }, { new: true });
        res.json({ message: 'Contract approved', contract });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
