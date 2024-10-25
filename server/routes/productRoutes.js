const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Məhsul əlavə etmək (POST)
// Məhsul əlavə etmək (POST)
router.post('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { branchName, products } = req.body;

    // products massivini dövrə salaraq hər bir məhsulu əlavə et
    const newProducts = products.map(product => ({
      ...product,
      branchName,
      category: [category],
    }));

    // Birdən çox məhsulu bazaya saxla
    const savedProducts = await Product.insertMany(newProducts);
    res.status(201).json(savedProducts);
  } catch (error) {
    console.error('Error adding products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Bütün məhsulları əldə etmək (GET)
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ID ilə məhsul əldə etmək (GET /:id)
router.get('/:category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Məhsulu yeniləmək (PUT)
router.put('/:category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Məhsulu qismən yeniləmək (PATCH)
router.patch('/:category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updates }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Məhsulu silmək (DELETE)
router.delete('/:category/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
