const db = require('./Database.js');
module.exports = class Categories {
    constructor() {}

    // static async saveProduct() {
    //     // Thêm một sản phẩm
    // }
    
    static async fetchAllCategoryies(callback) {
        let sqlCategoryies = `SELECT * FROM categories`;
        await db.query(sqlCategoryies, function(err, dataCategoryies){
            if (err) throw err;
            callback(dataCategoryies);
        });
    }
}