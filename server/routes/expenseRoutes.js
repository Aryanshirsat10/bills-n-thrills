const express = require('express');
const router = express.Router();
const Expense = require('../models/Expenses');
const app = express();

app.use(express.json());
// Get all expenses
router.get('/:userId', async (req, res) => {
  console.log('Received a Get request to /api/expenses/:userid', req.body);
  const userId = req.params.userId; // Get userId from the URL parameter

  try {
    // Find expenses specific to the provided userId
    const expenses = await Expense.find({ userId: userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new expense
router.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { category, paymentType, amount } = req.body;
  const newExpense = new Expense({ userId, category, paymentType, amount });
  try {
    const savedExpense = await newExpense.save();
    res.json(savedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an expense by ID
router.put('/:id', async (req, res) => {
  const { user, category, paymentType, amount } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, { user, category, paymentType, amount }, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    res.json(deletedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
