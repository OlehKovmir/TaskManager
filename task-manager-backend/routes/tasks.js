const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', protect, async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user._id, title, description });
  res.status(201).json(task);
});

router.put('/:id', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

router.delete('/:id', protect, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

  await task.remove();
  res.json({ message: 'Task removed' });
});

module.exports = router;
