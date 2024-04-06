const db = require('./Database.js');
module.exports = class Post {
    constructor() {
    }
    static getAll(callback) {
        let sql = `SELECT * FROM posts`;
        db.query(sql, function (err, data) {
            if (err) throw err;
            callback(data);
        });
    }

    static getOne(id, callback){
        let sql = `SELECT * FROM posts where id = ${id}`;
        db.query(sql, function(err, data){
            if (err) throw err;
            callback(data);
        })
    }

    static savePost(post, callback) { // Chỉnh sửa phương thức savePost
        db.query('insert into posts SET ?', post, function (err, data) {
            if (err) throw err;
            callback(data);
        })
    }

    static updatePost(id, updatedPost, callback) {
        let sql = `UPDATE posts SET ? WHERE id = ${id}`;
        db.query(sql,  updatedPost, function (err, data) {
            if (err) {
            callback(err, null);
            }
            callback(null, data);
        });
    }

    static deletePost(id, callback) {
        let sql = `DELETE FROM posts WHERE id = ?`;
        db.query(sql, id, function (err, data) {
            if (err) {
            callback(err, null);
            }
            callback(null, data);
        });
    }
}