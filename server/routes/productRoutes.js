const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,
  deleteProduct,
  getProductSalesHistory,
  deleteProductSale,
  getProductSaleById
} = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');  // Import auth middleware

const router = express.Router();

// Bütün məhsulları əldə etmək (Read) - Protected Route
router.get('/', verifyToken, getProducts);

// Tək məhsulu əldə etmək (Read by ID) - Protected Route
router.get('/:id', verifyToken, getProductById);

// Yeni məhsul əlavə etmək (Create) - Protected Route
router.post('/', verifyToken, createProduct);

// Məhsulu yeniləmək (Update) - Protected Route
router.put('/:id', verifyToken, updateProduct);

// Məhsulu qismən yeniləmək (Partial Update - Patch) - Protected Route
router.patch('/:id', verifyToken, patchProduct);

// Məhsulu silmək (Delete) - Protected Route
router.delete('/:id', verifyToken, deleteProduct);

// Məhsulun satış tarixçəsini əldə etmək (Get Sales by Product ID) - Protected Route
router.get('/:id/sales/', verifyToken, getProductSalesHistory);

// Tək bir satış tarixçəsini əldə etmək (Get Specific Sale by Sale ID) - Protected Route
router.get('/:id/sales/:saleId', verifyToken, getProductSaleById);

// Satış qeydi silmək (Delete Sales by Sale ID) - Protected Route
router.delete('/:id/sales/:saleId', verifyToken, deleteProductSale);

module.exports = router;
