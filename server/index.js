
const express = require('express');
const { app } = require('./connection'); // Import the Express app instance
const expenseRoutes = require('./routes/expenseRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const savingRoutes = require('./routes/savingsRoutes');
const userRoutes = require('./routes/userRoutes');
const creditData = require('./routes/creditDataRoute');
const debitData = require('./routes/fetchdataRoutes');
const PORT = 5000;
const cors = require('cors');
app.use(cors());

app.use('/api/expenses', expenseRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/savings', savingRoutes);
app.use('/api/users', userRoutes);
app.use('/api', creditData);
app.use('/api', debitData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
