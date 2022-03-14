const categoryHelpers = require("../helpers/category-helpers")

module.exports.loadCategories = async (req, res, next) => {
    req.session.category = null;
    req.session.subcategory = null;
    let categories = await categoryHelpers.getCategories();
    res.render('category', { categories });
}
module.exports.loadCreateCategory = async (req, res, next) => {
    let error = req.session?.errorSession;
    req.session.errorSession = null;
    res.render('create-edit-category', { action: '/category/create', title: 'Create Category', error });
}
module.exports.processCreateCategory = async (req, res, next) => {

    let data = req.body;
    categoryHelpers.checkNameDuplication(data.name).then((isExist) => {
        if (isExist) {
            req.session.errorSession = `Category ${data.name} already exist`;
            res.redirect('/category/create');
        }
        else {
            return categoryHelpers.createCategory(data)
        }
    }).then(() => {
        res.redirect('/category');
    }).catch(error => {
        console.log(error);
    })

}