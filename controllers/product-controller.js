const { select } = require("../config/connection")
const { PRODUCT_TABLE, SUBCATEGORY_TABLE, CATEGORY_TABLE } = require("../config/constants");
const categoryHelpers = require("../helpers/category-helpers");
const productHelpers = require("../helpers/product-helpers");

module.exports.loadCreateProduct = async (req, res, next) => {
    let error = req.session?.errorSession;
    let success = req.session.success;
    req.session.errorSession = null;
    req.session.success = null;
    const categories = await categoryHelpers.getCategories();
    res.render('create-edit-products', { success, categories, action: '/products/create', title: 'Create Product', error });
}
module.exports.loadProducts = async (req, res, next) => {
    let category = req.query.category
    let subcategory = req.query.subcategory;
    req.session.prodData = { category, subcategory }
    productHelpers.getProducts(subcategory, category).then((products) => {
        res.render('products', { products, category, subcategory })
    })

}
module.exports.processCreateProduct = (req, res, next) => {
    let data = req.body;
    productHelpers.createProduct(data).then(() => {
        res.redirect('/products/create');
        req.session.success = 'Product Created';
    })
}
