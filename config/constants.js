module.exports = {
    SESSION_SECRET: 'TEST',
    SESSION_TIMEOUT: 1 * 60 * 60 * 1000,
    MYSQL_CONNECTION_PARAMS: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'testproject'
    },
    CREATE_CATEGORY_TABLE:
        `CREATE TABLE IF NOT EXISTS categories (catid INT PRIMARY KEY AUTO_INCREMENT,name varchar(30) NOT NULL)`,
    CREATE_SUB_CATEGORY_TABLE:
        `CREATE TABLE IF NOT EXISTS subcategories (subcatid INT PRIMARY KEY AUTO_INCREMENT,subcatname varchar(30) NOT NULL,parentcat int REFERENCES categories(catid))`,
    CREATE_PRODUCT_TABLE:
        `CREATE TABLE IF NOT EXISTS products (prodid INT PRIMARY KEY AUTO_INCREMENT,prodname varchar(30) NOT NULL,subcategory int REFERENCES subcategories(subcatid))`
}