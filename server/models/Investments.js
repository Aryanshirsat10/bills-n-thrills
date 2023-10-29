const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
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
    generatesCashFlow: {
        type: Boolean,
        required: true
      },
    cashFlowAmount: {
        type: Number,
        required: function () {
          return this.generatesCashFlow; // Cash flow amount is required if generatesCashFlow is true
        }
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

const Investments = mongoose.model('Investments', investmentSchema);

module.exports = Investments;
