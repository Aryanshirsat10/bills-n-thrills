// Import necessary modules and models
const express = require('express');
const router = express.Router();
const Investment = require('../models/Investments');
const Expense = require('../models/Expenses');
const Saving = require('../models/Savings');

// Route to fetch credit data
router.get('/creditData/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch all investments with paymentType as credit
    const investments = await Investment.find({ userId,paymentType: 'credit' });

    // Fetch all expenses with paymentType as credit
    const expenses = await Expense.find({ userId,paymentType: 'credit' });

    // Fetch all savings with paymentType as credit
    const savings = await Saving.find({ userId,paymentType: 'credit' });

    // Calculate the total credit amount
    let totalCredit = 0;
    investments.forEach((investment) => {
      totalCredit += investment.amount;
    });
    expenses.forEach((expense) => {
      totalCredit += expense.amount;
    });
    savings.forEach((saving) => {
      totalCredit += saving.amount;
    });

    // Return the total credit amount as the response
    res.json({ totalCredit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;