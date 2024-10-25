const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  branchName: {
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
  unfitQuantity: {
    type: Number,
    required: true,
  },
  expiredQuantity: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0, // Başlanğıc dəyəri 0 olacaq
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: [String],
    required: true,
  },
});

// Yeni məhsul əlavə edilərkən və ya yenilənərkən ümumi qiyməti və qalıq miqdarı hesablayır
productSchema.pre('save', function (next) {
  this.totalPrice = this.soldQuantity * this.price;
  this.stockQuantity = this.preparedQuantity - (this.soldQuantity + this.unfitQuantity + this.expiredQuantity);
  next();
});

// Yeniləmə zamanı ümumi qiymət və qalıq miqdarını yeniləyən middleware
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();

  if (update.soldQuantity || update.preparedQuantity || update.unfitQuantity || update.expiredQuantity || update.price) {
    // Ümumi qiymət və qalıq miqdarı yeniləyir
    update.totalPrice = (update.soldQuantity || 0) * (update.price || 0);
    update.stockQuantity = (update.preparedQuantity || 0) - ((update.soldQuantity || 0) + (update.unfitQuantity || 0) + (update.expiredQuantity || 0));
  }

  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
