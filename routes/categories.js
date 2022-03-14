const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category-controller');


router.get('/', CategoryController.loadCategories);
router.get('/create', CategoryController.loadCreateCategory);
router.post('/create', CategoryController.processCreateCategory);
router.get('/modify/:id',CategoryController.loadModifyCategory);
router.post('/modify',CategoryController.processModifyCategory);
module.exports = router;