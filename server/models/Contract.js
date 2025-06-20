const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid', required: true },
    status: { type: String, enum: ['active', 'completed', 'approved'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contract', contractSchema);
