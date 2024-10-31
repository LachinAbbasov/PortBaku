const mongoose = require('mongoose');
const Product = require('../models/Product');

// Yeni məhsul(lar) əlavə etmək (Create)
const createProduct = async (req, res) => {
  try {
    const productsData = req.body; // Bütün məhsulları array olaraq alır

    // Məhsul məlumatlarını yoxlayın
    const products = productsData.map(product => {
      const {
        branchName,
        productName,
        soldQuantity = 0,
        preparedQuantity = 0,
        unfitQuantity = 0,
        expiredQuantity = 0,
        price,
        totalPrice = 0,
        stockQuantity = 0,
        category,
      } = product;

      // Tələb olunan sahələrin yoxlanılması
      if (!branchName || !productName || !price || !category) {
        throw new Error('Tələb olunan sahələr: branchName, productName, price, category');
      }

      return new Product({
        branchName,
        productName,
        soldQuantity,
        preparedQuantity,
        unfitQuantity,
        expiredQuantity,
        price,
        totalPrice,
        stockQuantity,
        category,
      });
    });

    // Bütün məhsulları MongoDB-yə əlavə edin
    const savedProducts = await Product.insertMany(products);
    res.status(201).json(savedProducts); // Uğurlu cavab
  } catch (error) {
    console.error('Məhsul(lar) əlavə etmə hatası:', error);
    res.status(500).json({ message: error.message }); // Xəta mesajı
  }
};




// Bütün məhsulları əldə etmək (Read - Get All Products)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
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
    console.error("Error fetching product:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Məhsulu yeniləmək (Update)
const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true } // Yeni dəyərləri geri qaytarır, validatorları işə salır
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Məhsulu qismən yeniləmək (Patch - Partial Update)
const patchProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Güncellenen verileri belgeye tətbiq edin
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    console.log("Güncellenen veri:", product);  // Güncellenen veriyi loglayın
    
    const updatedProduct = await product.save();
    console.log("Başarıyla kaydedildi:", updatedProduct);  // Kaydedilen veriyi loglayın

    res.json(updatedProduct);
  } catch (error) {
    console.error("Patch hatası:", error);
    res.status(500).json({ message: 'Server error' });
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
    console.error("Error deleting product:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cari ay üçün satış məlumatlarını əldə etmək
const getProductSalesForCurrentMonth = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthSales = product.salesHistory.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
    });

    res.json({
      product: product.productName,
      salesForCurrentMonth: currentMonthSales,
    });
  } catch (error) {
    console.error("Error fetching sales for the current month:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Məhsulun satış tarixçəsini əldə etmək (Get Sales History by Product ID)
const getProductSalesHistory = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Məhsul tapılmadı' });
    }

    res.json(product.salesHistory);  // Məhsulun satış tarixçəsini qaytarır
  } catch (error) {
    console.error("Satış tarixçəsini əldə edərkən xəta baş verdi:", error);
    res.status(500).json({ message: 'Server xətası' });
  }
};

// Məhsulun spesifik satış tarixçəsini əldə etmək
const getProductSaleById = async (req, res) => {
  try {
      const { id, saleId } = req.params;  // Məhsul ID və satış ID URL-dən götürülür
      const product = await Product.findById(id);

      if (!product) {
          return res.status(404).json({ message: 'Məhsul tapılmadı' });
      }

      // Satış tarixçəsindən müvafiq satış ID-sini tapırıq
      const sale = product.salesHistory.find(sale => sale._id.toString() === saleId);

      if (!sale) {
          return res.status(404).json({ message: 'Satış qeydi tapılmadı' });
      }

      res.json(sale);  // Satış qeydi tapılarsa, onu geri qaytarırıq
  } catch (error) {
      console.error("Satış tarixçəsini əldə edərkən xəta baş verdi:", error);
      res.status(500).json({ message: 'Server xətası' });
  }
};

// Məhsulun satış tarixçəsində müəyyən bir satış qeydlərini silmək
const deleteProductSale = async (req, res) => {
  const { id, saleId } = req.params; // ID-ləri çıxarırıq

  try {
      // Məhsulu ID-sinə görə tapırıq
      const product = await Product.findById(id);
      if (!product) {
          return res.status(404).json({ message: 'Məhsul tapılmadı' });
      }

      // Satış tarixçəsindən müvafiq satış ID-sini çıxarırıq
      product.salesHistory = product.salesHistory.filter(sale => sale._id.toString() !== saleId);

      // Yenilənmiş məhsulu saxlayırıq
      await product.save();

      res.status(200).json({ message: 'Satış qeydi silindi', salesHistory: product.salesHistory });
  } catch (error) {
      console.error("Error deleting sale:", error);
      res.status(500).json({ message: 'Serverdə xəta baş verdi', error: error.message });
  }
};





module.exports = {
  getProductSaleById,
  deleteProductSale,
  getProductSalesHistory,
  getProductSalesForCurrentMonth,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,
  deleteProduct,
};
