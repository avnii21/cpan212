// utils/taskProcessor.js
import Task from '../models/Task.js';
import User from '../models/User.js';

/**
 * Processes an incoming event (e.g., Ticketmaster) into a task for a specific user.
 * @param {Object} event - The raw event data
 * @param {String} userId - The ID of the user this event is for
 * @returns {Promise<Task|null>} - Returns the created task, or null if filtered out
 */
export async function processEventToTask(event, userId) {
  // 1. Get user preferences (if set)
  const user = await User.findById(userId);
  if (!user) {
    console.error(`User ${userId} not found`);
    return null;
  }

  const prefs = user.preferences || {};

  // Example: filter by ticket price
  if (prefs.maxTicketPrice && event.price && event.price > prefs.maxTicketPrice) {
    console.log(`Event "${event.name}" skipped — price ${event.price} > limit ${prefs.maxTicketPrice}`);
    return null;
  }

  // 2. Build the task data
  const taskData = {
    title: event.name || 'New Event',
    description: event.description || 'No description provided.',
    status: 'Pending',
    dueDate: event.date || null,
    userId: userId
  };

  // 3. Save the task in MongoDB
  const newTask = new Task(taskData);
  await newTask.save();

  console.log(`Created new task for ${user.name}: ${taskData.title}`);
  return newTask;
}
