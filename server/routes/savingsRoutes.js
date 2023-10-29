const express = require('express');
const router = express.Router();
const Saving = require('../models/Savings');

// Get all savings
router.get('/', async (req, res) => {
  try {
    const savings = await Saving.find();
    res.json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new saving
router.post('/', async (req, res) => {
  const { user, category, generatesCashFlow, cashFlowAmount, paymentType, amount } = req.body;
  const newSaving = new Saving({ user, category, generatesCashFlow, cashFlowAmount, paymentType, amount });
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
