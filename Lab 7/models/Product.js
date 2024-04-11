// const db = require('./Database.js');

// module.exports = class Product {
//     constructor() {}

//     static create(product, callback) {
//         db.query('insert into products SET ?', product, function (err, data) {
//             if (err){
//                 callback(err,null);
//             }else{
//                 callback(null, product);
//             }
            
//         })
//     }

//     static fetchAllProducts(callback) {   
//         let sqlProducts = `SELECT * FROM products`;
//         db.query(sqlProducts, function(err, dataProduct){
//             if (err) throw err;
//             callback(dataProduct);
//         });
//     }

//     static getOne(id, callback){
//         let sql = `SELECT * FROM products where id = ${id}`;
//         db.query(sql, function(err, data){
//             if (err) throw err;
//             callback(data);
//         })
//     }

//     static findById(id, callback) {
//         let sqlProduct = `SELECT * FROM products WHERE id = ?`;
//         db.query(sqlProduct, [id], function(err, product){
//             if (err) throw err;
//             callback(product[0]); // Trả về sản phẩm đầu tiên trong mảng kết quả (nếu có)
//         });
//     }

//     static delete(id, callback) {
//         let sqlDeleteProduct = `DELETE FROM products WHERE id = ?`;
//         db.query(sqlDeleteProduct, [id], function(err, deleteProduct){
//             if (err) throw err;
//             callback(deleteProduct);
//         });
//     }
    
//     static update(id, updatedProduct, callback) {
//         let sqlUpdateProduct = `UPDATE products SET ? WHERE id = ?`;
//         db.query(sqlUpdateProduct, [updatedProduct, id], function(err, result){
//             if (err) throw err;
//             callback(result);
//         });
//     }
// };
const sequelize = require('./Database.js');

const { Sequelize, DataTypes } = require('sequelize');

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    tiemstamps: false
  });

module.exports = Product;
    
