const Product = require("../../models/Product.js");
const ProductModel = require("../../models/Product.js");

exports.getPosts = async (req, res, next) => {
    const product = await ProductModel.findAll(
        {
            attributes: ['id','name', 'img', 'price', 'category_id', 'createdAt', 'updatedAt']
        }
    );
    res.status(200).json({
        data: product
    })

};

    exports.getOneProduct = async (req, res, next) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({
                "message": "INVALID id",
                "data": []
            })
        }

        const product = await Product.findByPk(id, {attributes: ['id','name', 'img', 'price', 'category_id', 'createdAt', 'updatedAt']});
        res.status(200).json({
            "message": "Success",
            "data": product,
        })
    }


// exports.postProducts = (req, res) => {
//     let product = {
//         name: req.body.name,
//         title: req.body.title,
//         img: req.file.filename,
//         price: req.body.price,
//         category_id: req.body.category_id,
//     }
//     ProductModel.create(product, function (data) {
//         res.status(201).json({
//             message: 'Thêm sản phẩm thành công',
//             product: data
//         });
//     });
// };

exports.postProducts = async (req, res, next) => {
    let product = {
        name: req.body.name,
        title: req.body.title,
        img: req.file.filename,
        price: req.body.price,
        category_id: req.body.category_id
    }

    const productRespone = await Product.create(product, {attributes: ['name', 'img', 'price', 'category_id', 'createdAt', 'updatedAt']});
    res.status(200).json({
        "message": "Success",
        "data": productRespone,
    })
  };



exports.updateProduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(404).json({ message: "INVALID id" });
        }

        // Lấy thông tin sản phẩm cần sửa từ cơ sở dữ liệu
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Cập nhật thông tin sản phẩm với dữ liệu mới từ client
        product.name = req.body.name;
        product.title = req.body.title;
        product.img = req.file.filename;
        product.price = req.body.price;
        product.category_id = req.body.category_id;

        // Lưu các thay đổi vào cơ sở dữ liệu
        await product.save();

        // Trả về thông tin sản phẩm sau khi đã được cập nhật
        res.status(200).json({
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      // Tạo một đối tượng chứa các thông tin cập nhật của sản phẩm
      const updatedProduct = {
        name : req.body.name,
        title : req.body.title,
        img : req.file.filename,
        price : req.body.price,
        category_id : req.body.category_id,

      };
      
      
      // Sử dụng phương thức update của model Product để cập nhật thông tin sản phẩm
      const [updatedRowCount, updatedProductRes] = await Product.update(updatedProduct, {
        where: { id: id },
        returning: true // Đảm bảo rằng phương thức trả về sản phẩm sau khi đã cập nhật
      });
      
      // Kiểm tra nếu không có bản ghi nào được cập nhật
      if (updatedRowCount === 0) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm để cập nhật" });
      }
      
      // Trả về dữ liệu sản phẩm đã được cập nhật và thông báo cập nhật thành công
      res.status(200).json({ 
        message: "Cập nhật sản phẩm thành công",
        data: updatedProductRes[0] 
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật sản phẩm" });
    }
  };