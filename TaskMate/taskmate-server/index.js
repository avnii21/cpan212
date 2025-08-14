import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import './utils/notificationJob.js';  // Just import it to start the cron job

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import ticketmasterRoutes from './routes/ticketmasterRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';  // <-- Import payment routes
import { createUpcomingSaleNotifications } from './utils/notificationJob.js';

dotenv.config();

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Put this route BEFORE mounting notificationRoutes to avoid conflicts
app.get('/api/notifications/run-job', async (req, res) => {
  try {
    await createUpcomingSaleNotifications();
    res.send("Job run successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Job failed");
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ticketmaster', ticketmasterRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes); // <-- Register payment routes

// Root test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
