const express = require('express');
const router = express.Router();
const Investment = require('../models/Investments');
const Saving = require('../models/Savings');
const app = express();

app.use(express.json());

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId; 
    try {
      const savingsData = await fetchSavingsDataForUsers({ userId : userId});
      res.json(savingsData);
    } catch (error) {
      console.error('Error fetching savings data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;