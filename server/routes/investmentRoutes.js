const express = require('express');
const router = express.Router();
const Investment = require('../models/Investments');
const app = express();

app.use(express.json());
// Get all investments
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId; 
  try {
    const investments = await Investment.find({ userId : userId});
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new investment
router.post('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { category, generatesCashFlow, cashFlowAmount, paymentType, amount } = req.body;
  const newInvestment = new Investment({ userId, category, generatesCashFlow, cashFlowAmount, paymentType, amount });
  try {
    const savedInvestment = await newInvestment.save();
    res.json(savedInvestment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an investment by ID
router.put('/:id', async (req, res) => {
  const { user, category, generatesCashFlow, cashFlowAmount, paymentType, amount } = req.body;
  try {
    const updatedInvestment = await Investment.findByIdAndUpdate(
      req.params.id,
      { user, category, generatesCashFlow, cashFlowAmount, paymentType, amount },
      { new: true }
    );
    res.json(updatedInvestment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an investment by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedInvestment = await Investment.findByIdAndDelete(req.params.id);
    res.json(deletedInvestment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
