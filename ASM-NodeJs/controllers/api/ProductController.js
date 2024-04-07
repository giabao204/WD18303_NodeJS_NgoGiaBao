const Product = require("../../models/Product.js");

exports.getProduct = async (req, res, next) => {
    const product = await Product.findAll(
        {
            attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']
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
        });
    };

    const product = await Product.findByPk(id, {attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']});
    res.status(200).json({
        "message": "Success",
        "data": product,
    });
};

exports.postProducts = async (req, res, next) => {
    let product = {
        name: req.body.name,
        title: req.body.title,
        images: req.file.filename,
        price: req.body.price,
        category_id: req.body.category_id
    }

    const productRespone = await Product.create(product, {attributes: ['id','name', 'title', 'images', 'price', 'category_id', 'createdAt', 'updatedAt']});
    res.status(200).json({
        "message": "Success",
        "data": productRespone,
    });
  };


exports.updateProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      // Tạo một đối tượng chứa các thông tin cập nhật của sản phẩm
      const updatedProduct = {
        name : req.body.name,
        title : req.body.title,
        images : req.file.filename,
        price : req.body.price,
        category_id : req.body.category_id,

      };
      
      
      // Sử dụng phương thức update của model Product để cập nhật thông tin sản phẩm
      const [updatedRowCount, updatedProductRes] = await Product.update(updatedProduct, {
        where: { id: id },
        returning: true // Đảm bảo rằng phương thức trả về sản phẩm sau khi đã cập nhật
      });
      
      if (updatedRowCount === 0) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm để cập nhật" });
      }
      
      res.status(200).json({ 
        message: "Cập nhật sản phẩm thành công",
        data: updatedProductRes[0] 
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật sản phẩm" });
    }
  };

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Tìm sản phẩm để xóa
    const productToDelete = await Product.findByPk(id);
    // Kiểm tra nếu không tìm thấy sản phẩm
    if (!productToDelete) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm để xóa" });
    }
    // Xóa sản phẩm từ cơ sở dữ liệu
    await productToDelete.destroy();
    // Trả về thông báo xóa thành công
    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi xóa sản phẩm" });
  }
};


