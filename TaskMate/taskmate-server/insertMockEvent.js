import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TicketmasterEvent from './models/TicketmasterEvent.js';
import Notification from './models/Notification.js';

dotenv.config();

async function insertMockEvent() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const userId = null; // global event
    const now = new Date();
    const saleStartDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 mins from now

    // Create mock event
    const mockEvent = new TicketmasterEvent({
      userId,
      title: 'Mock Concert Event',
      venue: 'Mock Venue',
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      saleStartDate,
      url: 'https://mocktickets.com/event/123',
    });

    const savedEvent = await mockEvent.save();
    console.log('Mock event saved:', savedEvent);

    // Create global notification
    const notification = await Notification.create({
      userId: null, // global notification
      eventId: savedEvent._id,
      message: `Tickets for "${savedEvent.title}" go on sale soon!`,
      isRead: false,
      isPaid: false,
      notifyAt: saleStartDate,
      createdAt: new Date()
    });

    console.log('Notification created:', notification);

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting mock event:', err);
  }
}

insertMockEvent();
