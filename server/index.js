const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // .env dosyasını yükle
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB bağlantısı sağlandı.'))
.catch((error) => console.error('MongoDB bağlantı hatası:', error));

// Ürün Ekleme Uç Noktası
app.post('/api/products', async (req, res) => {
  try {
    const { productName, soldQuantity, preparedQuantity, unfitQuantity, expiredQuantity } = req.body;

    const newProduct = new Product({
      productName,
      soldQuantity,
      preparedQuantity,
      unfitQuantity,
      expiredQuantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ürün eklenirken hata oluştu.', error });
  }
});

// Sunucuyu Başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
