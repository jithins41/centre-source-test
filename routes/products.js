const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product-controller');
router.get('/', ProductController.loadProducts);
router.get('/create',ProductController.loadCreateProduct)



module.exports = router;