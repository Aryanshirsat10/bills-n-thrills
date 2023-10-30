const express = require('express');
const router = express.Router();
const Investment = require('../models/Investments');
const Expense = require('../models/Expenses');
const Saving = require('../models/Savings');
const app = express();

app.use(express.json());

router.get('/creditData/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const investments = await Investment.find({ userId,paymentType: 'credit' });

    const expenses = await Expense.find({ userId,paymentType: 'credit' });

    const savings = await Saving.find({ userId,paymentType: 'credit' });

    
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

    
    res.json({ totalCredit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

module.exports = router;