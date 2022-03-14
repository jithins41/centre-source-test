const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index-controller');


router.get('/', IndexController.loadHomePage)



module.exports = router;