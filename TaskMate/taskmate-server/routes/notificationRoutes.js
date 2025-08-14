import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ 
      userId: req.params.userId, 
      isRead: false 
    }).sort({ notifyAt: 1 });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching notifications' });
  }
  
});
// Mark a notification as paid
router.patch('/:notificationId/paid', async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { isPaid: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Notification not found' });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating notification' });
  }
});


export default router;
