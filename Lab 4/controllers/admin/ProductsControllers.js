const Product = require("../../models/Product");
const Categories = require('../../models/Categoies');

const products = [];

exports.addProduct = (req, res, next) => {
    Categories.fetchAllCategoryies(function(dataCategoryies){
        res.render('admin/products/add-product',{
            categories: dataCategoryies,
        });
    });
};
exports.postAddProduct = (req, res, next) => {
    if (req.file) {
        const file = req.file;
        const productName = req.body.productName;
        const title = req.body.title;
        const productImage = file.filename;
        const productPrice = req.body.productPrice;
        const category = req.body.category;
        const product = {
            name: productName,
            title: title,
            img: productImage,
            price: productPrice,
            category_id: category
        };
        Product.saveProduct(product);
        res.redirect('/admin/list-product');
    } else {
        // Xử lý trường hợp không có tệp được tải lên
        res.status(400).send('No file uploaded');
    }
};



exports.getProduct = (req, res, next) => {
    Product.fetchAllProducts(function(data){
        res.render('admin/products/list-product', {
            products: data,
    });
});
    
}