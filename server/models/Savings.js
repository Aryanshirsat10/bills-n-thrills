const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  // Define your savings schema fields here
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Savings = mongoose.model('Savings', savingsSchema);

module.exports = Savings;
