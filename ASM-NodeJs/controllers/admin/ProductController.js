const Product = require("../../models/Product.js");

exports.getProduct = async (req, res, next) => {
    const product = await Product.findAll(
        {
            attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']
        }
    );
    res.render('admin/admin-product',{
        data: product
    })
}

exports.getAddProduct = async (req, res, next) => {
    try {
        res.render('admin/admin-product-add');
    } catch (error) {
        console.error('Error rendering add product page:', error);
        res.status(500).send('Error rendering add product page');
    }
};

exports.postAddProduct  = async (req, res, next) => {
    try {
        // Lấy dữ liệu từ request body và file upload (nếu có)
        let product = {
            name: req.body.name,
            title: req.body.title,
            images: req.file.filename,
            price: req.body.price,
            category_id: req.body.category_id
        };
        
        // Tạo một sản phẩm mới trong cơ sở dữ liệu
        const newProduct = await Product.create(product);
        
        // Redirect hoặc render trang sau khi thêm sản phẩm thành công
        res.render('admin/admin-product',{
            data : newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Error adding product');
    }
};