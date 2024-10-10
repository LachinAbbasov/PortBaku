// productController.js
const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { branchName, productName, category, soldQuantity, preparedQuantity, unfitQuantity, expiredQuantity } = req.body;

    const newProduct = new Product({
      branchName,
      productName,
      category,
      soldQuantity,
      preparedQuantity,
      unfitQuantity,
      expiredQuantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
};
