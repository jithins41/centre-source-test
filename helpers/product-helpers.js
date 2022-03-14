const { select, update, insert } = require('../config/connection');
const { CATEGORY_TABLE, SUBCATEGORY_TABLE, PRODUCT_TABLE } = require('../config/constants');
const Promise = require('Promise');
module.exports = {
    getProducts: (subcategory, category) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM PRODUCTS WHERE subcategory IN (SELECT subcatid FROM ${SUBCATEGORY_TABLE} where subcatname='${subcategory}' AND parentcat IN (SELECT catid from ${CATEGORY_TABLE} WHERE name='${category}'))`;
            console.log(qry)
            select(qry).then((response) => {
                resolve(response);
            })
        })
    },
    createProduct: ({ name, subcategory }) => {
        return new Promise((resolve, reject) => {
            let qry = `INSERT INTO ${PRODUCT_TABLE} (prodname,subcategory) VALUES ('${name}',${subcategory})`;
            insert(qry).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    // getCategoryName: (id) => {
    //     return new Promise((resolve, reject) => {
    //         let qry = `SELECT name from ${CATEGORY_TABLE} WHERE catid=${id}`;
    //         insert(qry).then((category) => {
    //             if (category.length < 0) {
    //                 resolve(false)
    //             }
    //             else {
    //                 resolve(category[0].name);
    //             }
    //         }).catch(error => {
    //             reject(error);
    //         })
    //     })
    // }
}

