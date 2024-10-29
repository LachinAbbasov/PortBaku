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
        default: 0, // Varsayılan değer
    },
    preparedQuantity: {
        type: Number,
        default: 0, // Varsayılan değer
    },
    unfitQuantity: {
        type: Number,
        default: 0, // Varsayılan değer
    },
    expiredQuantity: {
        type: Number,
        default: 0, // Varsayılan değer
    },
    stockQuantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
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

// Yeni məhsul əlavə edilərkən və ya yenilənərkən ümumi qiyməti ve qalıq miqdarı hesaplayıp, virgülden sonra 2 rakam kalacak şekilde yuvarlıyoruz
productSchema.pre('save', function (next) {
    this.totalPrice = parseFloat((this.soldQuantity * this.price).toFixed(2));  // Toplam fiyatı 2 ondalık basamakla yuvarla
    this.stockQuantity = parseFloat((this.preparedQuantity - (this.soldQuantity + this.unfitQuantity + this.expiredQuantity)).toFixed(2));  // Stok miktarını 2 ondalık basamakla yuvarla
    next();
});

// Güncellenen alanlar için hesaplamalar ve yuvarlama yapıyoruz
productSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    // Güncellenen alanlar varsa hesaplamaları elle yapıyoruz ve 2 basamak yuvarlıyoruz
    if (update.soldQuantity !== undefined || update.preparedQuantity !== undefined ||
        update.unfitQuantity !== undefined || update.expiredQuantity !== undefined ||
        update.price !== undefined) {
        
        const soldQuantity = update.soldQuantity || 0;
        const preparedQuantity = update.preparedQuantity || 0;
        const unfitQuantity = update.unfitQuantity || 0;
        const expiredQuantity = update.expiredQuantity || 0;
        const price = update.price || 0;

        update.totalPrice = parseFloat((soldQuantity * price).toFixed(2));  // Toplam fiyatı 2 ondalık basamakla yuvarla
        update.stockQuantity = parseFloat((preparedQuantity - (soldQuantity + unfitQuantity + expiredQuantity)).toFixed(2));  // Stok miktarını 2 ondalık basamakla yuvarla
    }

    next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
