const Product = require("../../models/Product");
const Categories = require('../../models/Categoies');


exports.home = (req, res, next) => {
    Categories.fetchAllCategoryies(function(dataCategoryies){
            res.render('client/home', {
                categories: dataCategoryies,
        });
    });
};

exports.shop = (req, res, next) => {
    Product.fetchAllProducts(function(dataProduct){
        Categories.fetchAllCategoryies(function(dataCategories){
            res.render('client/shop', {
                products: dataProduct,
                categories: dataCategories
            });
        });
    });
};


