const express = require('express');
const router = express.Router();
const Saving = require('../models/Savings');

// Get all savings
router.get('/:userId', async (req, res) => {
  console.log('Received a Get request to /api/expenses/:userid', req.body);
  const userId = req.params.userId; // Get userId from the URL parameter
  try {
    const savings = await Saving.find({ userId : userId});
    res.json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new saving
router.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const {category, generatesCashFlow, cashFlowAmount, paymentType, amount } = req.body;
  const newSaving = new Saving({ userId, category, generatesCashFlow, cashFlowAmount, paymentType, amount });
  try {
    const savedSaving = await newSaving.save();
    res.json(savedSaving);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a saving by ID
router.put('/:id', async (req, res) => {
  const { user, category, generatesCashFlow, cashFlowAmount, paymentType, amount } = req.body;
  try {
    const updatedSaving = await Saving.findByIdAndUpdate(
      req.params.id,
      { user, category, generatesCashFlow, cashFlowAmount, paymentType, amount },
      { new: true }
    );
    res.json(updatedSaving);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a saving by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSaving = await Saving.findByIdAndDelete(req.params.id);
    res.json(deletedSaving);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
