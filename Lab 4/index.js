// let mysql = require("mysql");
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "mysql",
//     database: "nodejs",
// });

//khai báo sử dụng multer
const clientRoute = require('./routes/client');
const adminRoute = require('./routes/admin');
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));

//khai bao sử dụng template ejs
app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.static("public"));


app.use('/admin', adminRoute);

app.use(clientRoute);



// app.get("/", (req, res) => {
//     let sqlCategories = `SELECT * FROM categories`;
//     db.query(sqlCategories, function (errCategories, dataCategories) {
//         if (errCategories) {
//             // Xử lý lỗi nếu có
//             throw errCategories;
//         }
//         var today = new Date();
//         currentDay = today.getDay();
//         var day = "";
//         switch (currentDay) {
//             case 0:
//                 day = "Chủ nhật";
//                 break;
//             case 1:
//                 day = "Thứ hai";
//                 break;
//             case 2:
//                 day = "Thứ ba";
//                 break;
//             case 3:
//                 day = "Thứ tư";
//                 break;
//             case 4:
//                 day = "Thứ năm";
//                 break;
//             case 5:
//                 day = "Thứ sáu";
//                 break;
//             case 6:
//                 day = "Thứ bảy";
//                 break;
//             default:
//                 console.log(`Error: ${currentDay}`);
//         }
//         res.render("home.ejs", { kindOfDay: day, categories: dataCategories });
//     });
// });

// //router
// app.get("/shop", (req, res) => {
//     let sql = `SELECT * FROM products`;
//     let sqlCategories = `SELECT * FROM categories`;
//     db.query(sqlCategories, function (errCategories, dataCategories) {
//         if (errCategories) {
//             // Xử lý lỗi nếu có
//             throw errCategories;
//         }
//         db.query(sql, function (err, data) {
//             if (err) throw err;
//             res.render("shop.ejs", { products: data, categories: dataCategories });
//         });
//     });
// });

// app.get("/shop/:cateId", (req, res) => {
//     let cateId = req.params.cateId;
//     let sqlProducts = `SELECT * FROM products WHERE category_id=${cateId}`;
//     let sqlCategories = `SELECT * FROM categories`;

//     // Thực thi câu lệnh SQL cho sản phẩm
//     db.query(sqlProducts, function (errProducts, dataProducts) {
//         if (errProducts) {
//             throw errProducts;
//         }

//         // Thực thi câu lệnh SQL cho các danh mục
//         db.query(sqlCategories, function (errCategories, dataCategories) {
//             if (errCategories) {
//                 throw errCategories;
//             }
//             console.log(dataCategories);
//             // Trả về dữ liệu đến view
//             res.render("shop.ejs", {
//                 products: dataProducts,
//                 categories: dataCategories,
//             });
//         });
//     });
// });

// app.get("/addnew", (req, res) => {
//     let sqlCategories = `SELECT * FROM categories`;
//     db.query(sqlCategories, function (errCategories, dataCategories) {
//         if (errCategories) {
//             // Xử lý lỗi nếu có
//             throw errCategories;
//         }
//         res.render("add-product.ejs", { categories: dataCategories });
//     });
// });

// //khai báo sử dụng multer
// // SET STORAGE
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/images");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
// const upload = multer({
//     storage: storage,
// }).single("productImage");

// // Route để xử lý yêu cầu POST từ biểu mẫu
// app.post("/addnew", (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             throw err;
//         }
//     // Lấy dữ liệu từ biểu mẫu
//     const productName = req.body.productName;
//     const title = req.body.title;
//     const productImage = req.file.filename;
//     const productPrice = req.body.productPrice;
//     const category = req.body.category;

//     // Chèn dữ liệu vào cơ sở dữ liệu MySQL
//     const sql = "INSERT INTO products (name, title, img, price, category_id) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [productName, title,  productImage, productPrice, category], (err, result) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Data inserted into MySQL database");
//         res.redirect("/shop"); // Chuyển hướng đến trang chủ hoặc bất kỳ đâu bạn muốn
//         });
//     });
// });

app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
