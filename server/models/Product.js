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
    salesHistory: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            soldQuantity: Number,
            preparedQuantity: Number,
            unfitQuantity: Number,
            expiredQuantity: Number,
            totalPrice: Number,
            stockQuantity: Number,
        }
    ],
    category: {
        type: [String],
        required: true,
    },
});

// Yeni ürün eklenirken mevcut verileri satış geçmişine sadece yeni satış ekleniyorsa ekliyoruz
productSchema.pre('save', function (next) {
    if (this.isModified('soldQuantity') || this.isModified('preparedQuantity') || this.isModified('unfitQuantity') || this.isModified('expiredQuantity')) {
        const newSalesEntry = {
            date: new Date(),
            soldQuantity: this.soldQuantity,
            preparedQuantity: this.preparedQuantity,
            unfitQuantity: this.unfitQuantity,
            expiredQuantity: this.expiredQuantity,
            totalPrice: parseFloat((this.soldQuantity * this.price).toFixed(2)),
            stockQuantity: parseFloat((this.preparedQuantity - (this.soldQuantity + this.unfitQuantity + this.expiredQuantity)).toFixed(2)),
        };

        // Sadece yeni satış ekleniyorsa satış geçmişine ekliyoruz
        this.salesHistory.push(newSalesEntry);

        // Toplam fiyat ve stok miktarını güncel hesaplıyoruz
        this.totalPrice = newSalesEntry.totalPrice;
        this.stockQuantity = newSalesEntry.stockQuantity;
    }

    next();
});

// Ürün güncellenirken de satış geçmişine sadece yeni satış ekleniyorsa ekliyoruz
productSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    // Sadece satışla ilgili alanlar güncelleniyorsa satış geçmişine ekliyoruz
    if (update.soldQuantity || update.preparedQuantity || update.unfitQuantity || update.expiredQuantity || update.price) {
        const soldQuantity = update.soldQuantity || 0;
        const preparedQuantity = update.preparedQuantity || 0;
        const unfitQuantity = update.unfitQuantity || 0;
        const expiredQuantity = update.expiredQuantity || 0;
        const price = update.price || 0;

        const newSalesEntry = {
            date: new Date(),
            soldQuantity: soldQuantity,
            preparedQuantity: preparedQuantity,
            unfitQuantity: unfitQuantity,
            expiredQuantity: expiredQuantity,
            totalPrice: parseFloat((soldQuantity * price).toFixed(2)),
            stockQuantity: parseFloat((preparedQuantity - (soldQuantity + unfitQuantity + expiredQuantity)).toFixed(2)),
        };

        // Satış geçmişine yeni bir kayıt ekliyoruz
        update.$push = { salesHistory: newSalesEntry };

        update.totalPrice = newSalesEntry.totalPrice;
        update.stockQuantity = newSalesEntry.stockQuantity;
    }

    next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
