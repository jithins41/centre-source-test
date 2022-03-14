const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category-controller');
router.get('/', CategoryController.loadCategories);
router.get('/create', CategoryController.loadCreateCategory);
router.post('/create', CategoryController.processCreateCategory);


module.exports = router;