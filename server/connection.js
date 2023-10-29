const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;
const uri = process.env.MONGODB_URI;
const corsOptions = {
  origin: 'http://localhost:3000',
  // Other CORS options if needed
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
// models
const Expenses = require("./models/Expenses.js");
const Investments = require('./models/Investments.js');
const Savings = require('./models/Savings.js');
const Users = require('./models/Users.js');
// Your routes and other middleware go here

// Start the server
module.exports = {
  app,
  Expenses,
  Investments,
  Savings,
  Users
};