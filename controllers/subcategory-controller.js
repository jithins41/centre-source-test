const categoryHelpers = require("../helpers/category-helpers");
const subcategoryHelpers = require("../helpers/subcategory-helpers")



module.exports.loadSubCategories = async (req, res, next) => {
    let name = req.query.category;
    req.session.category = name;
    let subcategories = await subcategoryHelpers.getSubCategories(name);
    for (const element of subcategories) {
        element.category = await categoryHelpers.getCategoryName(element.parentcat);
    }
    console.log(subcategories)
    res.render('subcategory', { subcategories });
}
module.exports.loadCreateSubCategory = async (req, res, next) => {
    let error = req.session?.errorSession;
    let categories = await categoryHelpers.getCategories();
    res.render('create-edit-subcategory', { action: '/subcategory/create', title: 'Create  Sub Category', error, categories });
}
module.exports.processCreateSubCategory = async (req, res, next) => {

    let data = req.body;
    subcategoryHelpers.checkNameDuplication(data.name, data.parentcat).then((isExist) => {
        if (isExist) {
            req.session.errorSession = `Sub Category ${data.name} under ${category} already exist`;
            res.redirect('/subcategory/create');
        }
        else {
            return subcategoryHelpers.createSubCategory(data)
        }
    }).then(() => {
        res.redirect('/category');
    }).catch(error => {
        console.log(error);
    })

}