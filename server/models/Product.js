const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
  unfitQuantity: {
    type: Number,
    required: true,
  },
  expiredQuantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
