// productController.js
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Yeni məhsul əlavə etmək (Create)
const createProduct = async (req, res) => {
  try {
    const {
      branchName,
      productName,
      soldQuantity = 0, // Varsayılan değer
      preparedQuantity = 0, // Varsayılan değer
      unfitQuantity = 0, // Varsayılan değer
      expiredQuantity = 0, // Varsayılan değer
      price,
      category,
    } = req.body;

    const newProduct = new Product({
      branchName,
      productName,
      soldQuantity,
      preparedQuantity,
      unfitQuantity,
      expiredQuantity,
      price,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Ürün kaydetme hatası:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Bütün məhsulları əldə etmək (Read - Get All Products)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Tək məhsulu əldə etmək (Read - Get Single Product)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Məhsulu yeniləmək (Update)
const updateProduct = async (req, res) => {
  try {
    // Geçerli bir ObjectID olup olmadığını kontrol et
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Məhsulu qismən yeniləmək (Patch - Partial Update)
const patchProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Ürünü bul ve manuel olarak güncelle
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Güncellenen verileri belgeye uyguluyoruz
    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });

    // 'save' kullanarak 'pre' middleware'i tetiklenir ve hesaplamalar yapılır
    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Patch hatası:", error);  // Hata detaylarını loglayalım
    return res.status(400).json({ message: 'Error patching product', error });
  }
};



// Məhsulu silmək (Delete)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,  
  deleteProduct,
};