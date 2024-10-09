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
  stockQuantity: { // Qalıq sahəsi
    type: Number,
    required: true,
    default: 0, // Default dəyəri 0
  },
});

// Qalıq hesablaması üçün virtual sahə
productSchema.virtual('remainingQuantity').get(function() {
  return this.preparedQuantity - (this.soldQuantity + this.unfitQuantity + this.expiredQuantity);
});

// Virtual sahəni JSON və Object-yə daxil edin
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
