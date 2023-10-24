const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;
const uri = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
console.log("Mongodb_URI: " , process.env.MONGODB_URI);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Your routes and other middleware go here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});