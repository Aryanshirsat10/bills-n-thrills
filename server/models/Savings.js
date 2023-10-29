const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  // Define your savings schema fields here
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
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
