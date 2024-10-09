const express = require('express');
const Product = require('../models/Product'); // Mongoose modelini içə aktarırsınız
const router = express.Router();

// Bütün məhsulları əldə etmək
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Bütün məhsulları əldə et
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Müəyyən kateqoriyaya əsasən məhsulları əldə etmək
router.get('/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Yeni məhsul əlavə etmək
router.post('/', async (req, res) => {
  const { productName, soldQuantity, preparedQuantity, unfitQuantity, expiredQuantity } = req.body;

  const newProduct = new Product({
    productName,
    soldQuantity,
    preparedQuantity,
    unfitQuantity,
    expiredQuantity,
    stockQuantity: preparedQuantity, // Qalıq sahəsini hazırlayırıq
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error saving product' });
  }
});

// Müəyyən məhsulu yeniləmək
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
});

// Müəyyən məhsulu silmək
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
