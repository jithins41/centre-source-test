const { select } = require("../config/connection")
const { PRODUCT_TABLE, SUBCATEGORY_TABLE, CATEGORY_TABLE } = require("../config/constants");
const categoryHelpers = require("../helpers/category-helpers");
const productHelpers = require("../helpers/product-helpers");

module.exports.loadCreateProduct = (req, res, next) => {
    let error = req.session?.errorSession;
    req.session.errorSession = null;
    res.render('create-edit-products', { action: '/product/create', title: 'Create Product', error });
}
module.exports.loadProducts = async (req, res, next) => {
    let category = req.query.category
    let subcategory = req.query.subcategory
    productHelpers.getProducts(subcategory,category).then((products)=>{
        res.render('products',{products})
    })
  
}
module.exports.createProduct = (req,res,next)=>{
    
}
