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

exports.editProduct = (req, res, next) => {
    const productId = req.params.id;
    Categories.fetchAllCategoryies(function(dataCategoryies){
    // Lấy thông tin sản phẩm cần sửa từ model
    Product.findById(productId, function(product) {
        // Render trang sửa sản phẩm với dữ liệu sản phẩm được lấy từ model
        res.render('admin/products/edit-product', {categories: dataCategoryies, product: product });
    });
    });
};
exports.updateProduct = (req, res, next) => {
    const productId = req.params.id;
    const updatedProduct = {
        name: req.body.productName,
        title: req.body.title,
        price: req.body.productPrice,
        category_id: req.body.category
    };

    // Gọi phương thức update của model để cập nhật thông tin sản phẩm
    Product.update(productId, updatedProduct, function(result) {
        res.redirect('/admin/list-product');
    });
};


exports.deleteProduct = (req, res, next) => {
    const productId = req.params.id;

    // Gọi phương thức delete của model để xóa sản phẩm
    Product.delete(productId, function() {
        res.redirect('/admin/list-product');
    });
};