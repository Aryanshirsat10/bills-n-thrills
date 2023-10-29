const express = require('express');
const router = express.Router();
const User = require('../models/Users');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  console.log('Received a POST request to /api/users:', req.body);
  const { name, userId } = req.body;
  const newUser = new User({ name, userId });
  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      // If user exists, return a message indicating the user already exists
      return res.status(200).json({ message: 'User already exists.' });
    }
    const savedUser = await newUser.save();
    console.log('User data saved successfully:', savedUser);
    res.json(savedUser);
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { name, userId } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, userId },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
