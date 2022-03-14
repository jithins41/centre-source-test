const { select, insert } = require("../config/connection");
const { SUBCATEGORY_TABLE, CATEGORY_TABLE } = require("../config/constants");

module.exports = {
    getSubCategories: (catname) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM subcategories WHERE parentcat IN (SELECT catid from categories where name='${catname}');`;
            console.log(qry);
            select(qry).then((response) => {
                resolve(response);
            })
        })
    },
    checkNameDuplication: (name, id) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM ${SUBCATEGORY_TABLE} WHERE SUBCATNAME ='${name}' AND PARENTCAT='${id}'`;
            select(qry).then(response => {
                if (response.length < 1) {
                    resolve(false)
                }
                else {
                    resolve(true);
                }
            })
        })
    },
    createSubCategory: ({ name, parentcat }) => {
        return new Promise((resolve, reject) => {
            let qry = `INSERT INTO ${SUBCATEGORY_TABLE} (subcatname,parentcat) VALUES ('${name}','${parentcat}')`;
            console.log(qry)
            insert(qry).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    getSubCats: (catid) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM ${SUBCATEGORY_TABLE} WHERE parentcat=${catid}`;
            select(qry).then((response) => {
                resolve(response);
            })
        })
    }
}