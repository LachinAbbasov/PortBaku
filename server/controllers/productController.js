const Product = require('../models/Product');

// Yeni məhsul əlavə etmək
const createProduct = async (req, res) => {
  try {
    const { branchName, productName, soldQuantity, preparedQuantity, unfitQuantity, expiredQuantity, price } = req.body;

    const newProduct = new Product({
      branchName,
      productName,
      soldQuantity,
      preparedQuantity,
      unfitQuantity,
      expiredQuantity,
      price,
    });

    // Ümumi qiymət və qalıq miqdar avtomatik hesablanır və saxlanır
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Məhsulu yeniləmək
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product' });
  }
};

module.exports = {
  createProduct,
  updateProduct,
};
