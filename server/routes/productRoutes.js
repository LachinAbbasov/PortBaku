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

// Məhsulun satış tarixçəsini əldə etmək (Get Sales by Product ID)
router.get('/:id/sales/', getProductSalesHistory);

// Tək bir satış tarixçəsini əldə etmək (Get Specific Sale by Sale ID)
router.get('/:id/sales/:saleId', getProductSaleById);

// Satış qeydi silmək (Delete Sales by Sale ID)
router.delete('/:id/sales/:saleId', deleteProductSale);

module.exports = router;
