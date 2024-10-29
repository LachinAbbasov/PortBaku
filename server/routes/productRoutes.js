const express = require('express');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  patchProduct,  // PATCH metodu ekleniyor
  deleteProduct
} = require('../controllers/productController');  // Import doğru, sadece patchProduct da eklendi

const router = express.Router();

// Bütün məhsulları əldə etmək (Read)
router.get('/', getProducts);

// Tək məhsulu əldə etmək (Read by ID)
router.get('/:id', getProductById);

// Yeni məhsul əlavə etmək (Create)
router.post('/', createProduct);

// Məhsulu yeniləmək (Update)
router.put('/:id', updateProduct);

// Məhsulu qismən yeniləmək (Partial Update - Patch)
router.patch('/:id', patchProduct); // PATCH route düzgün təyin edilməlidir



// Məhsulu silmək (Delete)
router.delete('/:id', deleteProduct);

module.exports = router;
