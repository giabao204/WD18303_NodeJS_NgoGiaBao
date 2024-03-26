const db = require('./Database.js');
module.exports = class Product {
    constructor() {}

    static saveProduct(product) {
        db.query('INSERT INTO products SET ?',product, function(err, data) {
        if (err) throw err;
        return true;
        })
        }

    static async fetchAllProducts(callback) {   
        let sqlProducts = `SELECT * FROM products`;
        await db.query(sqlProducts, function(err, dataProduct){
            if (err) throw err;
            callback(dataProduct);
        });
    }

    static async findById(id, callback) {
        let sqlProduct = `SELECT * FROM products WHERE id = ?`;
        await db.query(sqlProduct, [id], function(err, product){
            if (err) throw err;
            callback(product[0]); // Trả về sản phẩm đầu tiên trong mảng kết quả (nếu có)
        });
    }
}

