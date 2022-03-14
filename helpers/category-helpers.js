const { select, update, insert } = require('../config/connection');
const { CATEGORY_TABLE } = require('../config/constants');

module.exports = {
    getCategories: () => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM CATEGORIES`;
            select(qry).then((response) => {
                resolve(response);
            })
        })
    },
    checkNameDuplication: (name) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT * FROM CATEGORIES WHERE NAME ='${name}'`;
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
    createCategory: ({ name }) => {
        return new Promise((resolve, reject) => {
            let qry = `INSERT INTO CATEGORIES (name) VALUES ('${name}')`;
            insert(qry).then(() => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    },
    getCategoryName: (id) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT name from ${CATEGORY_TABLE} WHERE catid=${id}`;
            insert(qry).then((category) => {
                if (category.length < 0) {
                    resolve(false)
                }
                else {
                    resolve(category[0].name);
                }
            }).catch(error => {
                reject(error);
            })
        })
    },
    getCategoryId: (name) => {
        return new Promise((resolve, reject) => {
            let qry = `SELECT catid from ${CATEGORY_TABLE} WHERE name='${name}'`;
            insert(qry).then((category) => {
                if (category.length < 0) {
                    resolve(false)
                }
                else {
                    resolve(category[0].name);
                }
            }).catch(error => {
                reject(error);
            })
        })
    }
}

