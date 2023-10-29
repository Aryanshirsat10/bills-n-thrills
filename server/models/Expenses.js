const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
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

const Expenses = mongoose.model('Expenses', expenseSchema);

module.exports = Expenses;
