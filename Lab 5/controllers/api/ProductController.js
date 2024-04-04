const ProductModel = require("../../models/Product.js");

exports.getPosts = (req, res, next) => {
    ProductModel.fetchAllProducts(function (data) {
        res.status(200).json({
            data: data
        })
    })
};

exports.getOneProduct = (req, res, next) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(404).json({
            "message": "INVALID id",
            "data": []
        })
    }
    ProductModel.getOne(id, function (data) {
        res.status(200).json({
            posts: data
        });
    });
}


exports.postProducts = (req, res) => {
    let product = {
        name: req.body.name,
        title: req.body.title,
        img: req.file.filename,
        price: req.body.price,
        category_id: req.body.category_id,
    }
    ProductModel.create(product, function (data) {
        res.status(201).json({
            message: 'Thêm sản phẩm thành công',
            product: data
        });
    });
};