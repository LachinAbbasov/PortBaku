const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  soldQuantity: {
    type: Number,
    required: true,
  },
  preparedQuantity: {
    type: Number,
    required: true,
  },
  expiredQuantity: {
    type: Number,
    required: true,
  },
  remainingQuantity: {
    type: Number,
    required: true,
  },
  unfitQuantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Sale = mongoose.model('Sale', saleSchema);
module.exports = Sale;
