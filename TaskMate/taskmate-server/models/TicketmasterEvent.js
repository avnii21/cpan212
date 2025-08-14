import mongoose from 'mongoose';

const ticketmasterEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  venue: String,
  date: Date,
  saleStartDate: Date,   // <-- Important for notifications
  url: String,
});

const TicketmasterEvent = mongoose.model('TicketmasterEvent', ticketmasterEventSchema);

export default TicketmasterEvent;

