const mysql = require('mysql2');
const { createTable } = require('../helpers/mysql-operations');
const { MYSQL_CONNECTION_PARAMS, CREATE_CATEGORY_TABLE, CREATE_SUB_CATEGORY_TABLE, CREATE_PRODUCT_TABLE, CREATE_DATABASE } = require('./constants');
const connection = mysql.createConnection(MYSQL_CONNECTION_PARAMS);

module.exports.create = (qry) => {
    return new Promise((resolve, reject) => {
        connection.query(qry, (error, data, fields) => {
            if (error) {
                console.log(error.message);
                reject(error);
            }
            else {
                resolve(data);
            }
        })
    })
}
module.exports.createDatabase = () => {
    return new Promise((resolve, reject) => {

        this.create(CREATE_CATEGORY_TABLE).then(() => {
            return this.create(CREATE_SUB_CATEGORY_TABLE)
        }).then(() => {
            return this.create(CREATE_PRODUCT_TABLE)
        }).then(() => {
            resolve();
        }).catch(error => {
            console.log(error);
        })
    })
}

module.exports.select = function (qry) {
    return new Promise((resolve, reject) => {
        connection.query(qry, function (error, result, fields) {
            if (!error) {
                resolve(result, fields);
            }
            else {
                reject(error);
            }
        })
    })
}

module.exports.insert = function (qry) {
    return new Promise((resolve, reject) => {
        connection.query(qry, (error, data, fields) => {
            if (!error) {
                resolve(data, fields);
            }
            else {
                reject(error);
            }
        })
    })
}
module.exports.update = function (qry, values) {
    return new Promise((resolve, reject) => {
        connection.query(qry, values, (error, data, fields) => {
            if (!error) {
                resolve(data, fields);
            }
            else {
                reject(error);
            }
        })
    })
}
