const express = require('express');
const router = express.Router();
const Investment = require('../models/Investments');
const Saving = require('../models/Savings');
const app = express();

app.use(express.json());

router.get('/debitData/:userId', async (req, res) => {
    const userId = req.params.userId; 
    try {
      const investments = await Investment.find({ userId, paymentType: 'debit' });
      const savings = await Saving.find({ userId, paymentType: 'debit' });
  
      const debitAmounts = [...investments, ...savings].reduce((total, item) => {
        return total + item.amount;
      }, 0);
  
      res.json({ debitAmounts });
    } catch (error) {
      console.error('Error fetching debit amounts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports = router;