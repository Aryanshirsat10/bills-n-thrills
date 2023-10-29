// const { app, Expenses, Investments, Savings, Users } = require('./connection');

// // Your routes and other middleware go here

// // Example expense route
// app.get('/api/expenses', async (req, res) => {
//   try {
//     const expenses = await Expenses.find();
//     res.json(expenses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Example investment route
// app.get('/api/investments', async (req, res) => {
//   try {
//     const investments = await Investments.find();
//     res.json(investments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Example savings route
// app.get('/api/savings', async (req, res) => {
//   try {
//     const savings = await Savings.find();
//     res.json(savings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Example user route
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await Users.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const { app } = require('./connection'); // Import the Express app instance
const expenseRoutes = require('./routes/expenseRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const savingRoutes = require('./routes/savingsRoutes');
const userRoutes = require('./routes/userRoutes');
const PORT = 5000;

app.use('/api/expenses', expenseRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/savings', savingRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
