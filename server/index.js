const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));

// ✅ Route Mounting (Must match frontend expectations)
app.use('/api/auth', require('./routes/auth'));         // for /api/auth/*
app.use('/api/jobs', require('./routes/job'));          // for /api/jobs/*
app.use('/api/bids', require('./routes/bid'));          // for /api/bids/*
app.use('/api/messages', require('./routes/message'));  // for /api/messages/*
app.use('/api/contracts', require('./routes/contract')); // if needed

// ✅ Connect DB and Start Server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
