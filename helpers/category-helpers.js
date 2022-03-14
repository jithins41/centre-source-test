const { select, update, insert } = require('../config/connection')

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
    }
}
