const express = require('express');
const router = express.Router();


const SubcategoryController = require('../controllers/subcategory-controller');

router.get('/', SubcategoryController.loadSubCategories);
router.get('/create',SubcategoryController.loadCreateSubCategory);
router.post('/create', SubcategoryController.processCreateSubCategory);
router.post('/load',SubcategoryController.loadSubs)
module.exports = router;