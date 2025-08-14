// models/Notification.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'TicketmasterEvent' },
  message: String,
  isRead: { type: Boolean, default: false },
  isPaid: { type: Boolean, default: false },  // <-- Add this line
  createdAt: { type: Date, default: Date.now },
  notifyAt: { type: Date }, // when to notify user
});


const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
