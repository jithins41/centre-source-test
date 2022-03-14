const { Router } = require("express");
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
    res.render('create-edit-category', { category: {}, action: '/category/create', title: 'Create Category', error });
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
        res.redirect('/category/create');
    }).catch(error => {
        console.log(error);
    })

}
module.exports.loadModifyCategory = async (req, res, next) => {
    let id = req.params.id;
    let error = req.session?.errorSession;
    req.session.errorSession = null;
    let data = await categoryHelpers.getCategoryDetails(id);
    if (data?.catid == undefined) { res.redirect('/category/create') }
    else {
        req.session.catid = id;
        res.render('create-edit-category', { action: '/category/modify', category: data, title: 'Create Category', error });
    }

}
module.exports.processModifyCategory = (req, res, next) => {
    let catid = req.session.catid;
    req.session.catid = null;
    categoryHelpers.checkNameDuplication(req.body.name).then((isTrue) => {
        if (isTrue) {
            req.session.errorSession = `Category ${req.body.name} already exist`;
            res.redirect(`/category/modify/${catid}`);
        }
        else{
            return categoryHelpers.updateCategoryName(catid, req.body.name)
        }
    })
    .then(() => {
        res.redirect('/category');
    })
}