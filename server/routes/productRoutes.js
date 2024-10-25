const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');  // Import doğru mu?

const router = express.Router();

// Bütün məhsulları əldə etmək (Read)
router.get('/', getProducts);

// Tək məhsulu əldə etmək (Read by ID)
router.get('/:id', getProductById);

// Yeni məhsul əlavə etmək (Create)
router.post('/', createProduct);

// Məhsulu yeniləmək (Update)
router.put('/:id', updateProduct);

// Məhsulu silmək (Delete)
router.delete('/:id', deleteProduct);

module.exports = router;
