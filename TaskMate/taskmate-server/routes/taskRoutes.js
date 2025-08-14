import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Get tasks for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  
  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    console.error('GET /tasks error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { userId, title, description, status, dueDate } = req.body;
  if (!userId || !title) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const newTask = new Task({ userId, title, description, status, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('POST /tasks error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error(`PUT /tasks/${req.params.id} error:`, err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(`DELETE /tasks/${req.params.id} error:`, err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
