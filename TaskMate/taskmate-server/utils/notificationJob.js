import cron from 'node-cron';
import TicketmasterEvent from '../models/TicketmasterEvent.js';
import Notification from '../models/Notification.js';

export async function createUpcomingSaleNotifications() {
  const now = new Date();
  const upcomingWindow = new Date(now.getTime() + 60 * 60 * 1000); // next hour

  const upcomingEvents = await TicketmasterEvent.find({
    saleStartDate: { $gte: now, $lte: upcomingWindow },
  });

  for (const event of upcomingEvents) {
    const exists = await Notification.findOne({
      userId: event.userId,
      eventId: event._id,
      isRead: false,
    });
    if (!exists) {
      await Notification.create({
        userId: event.userId,
        eventId: event._id,
        message: `Tickets for "${event.title}" go on sale soon!`,
        notifyAt: event.saleStartDate,
      });
    }
  }
}

// Schedule every 15 minutes
cron.schedule('*/15 * * * *', () => {
  console.log('Running notification job');
  createUpcomingSaleNotifications().catch(console.error);
});
