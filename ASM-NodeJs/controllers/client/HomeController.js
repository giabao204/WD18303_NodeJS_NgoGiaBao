const Product = require("../../models/Product.js");

exports.home = async (req, res, next) => {
    const product = await Product.findAll(
        {
            attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']
        }
    );
    res.render('client/index', {
        data: product
    })
}

exports.shop = async (req, res, next) => {
    const product = await Product.findAll(
        {
            attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']
        }
    );
    res.render('client/products', {
        data: product
    })
    
}

exports.single = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).send('INVALID id');
        }
        const product = await Product.findByPk(id, {
            attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']
        });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('client/singleproduct', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.store =  (req, res, next) => {
    res.render('client/store')
}