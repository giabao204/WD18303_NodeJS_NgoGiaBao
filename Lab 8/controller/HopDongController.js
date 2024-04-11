const Hopdong = require("../model/Hopdong.js");
const moment = require('moment');
exports.getHopdong = async (req, res, next) => {
  const hopdong = await Hopdong.findAll({
    attributes: [
      "id",
      "ten_nguoi_mua",
      "ten_nguoi_ban",
      "gia_tien",
      "ngay_ky",
      "trang_thai",
      "createdAt",
      "updateAt"
    ],
  });
  res.status(200).json({
    data: hopdong,
  });
};

exports.getOneHopdong = async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(404).json({
      message: "INVALID id",
      data: [],
    });
  }

  const hopdong = await Hopdong.findByPk(id, {
    attributes: [
      "id",
      "ten_nguoi_mua",
      "ten_nguoi_ban",
      "gia_tien",
      "ngay_ky",
      "trang_thai",
    ],
  });
  res.status(200).json({
    message: "Success",
    data: hopdong,
  });
};
exports.createHopdong = async (req, res, next) => {
  try {
    // Kiểm tra các trường không được để trống
    if (!req.body.ten_nguoi_mua || !req.body.ten_nguoi_ban || !req.body.gia_tien || !req.body.ngay_ky || !req.body.trang_thai) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }
    // Kiểm tra ngày ký hợp đồng
    if (!moment(req.body.ngay_ky).isAfter(moment())) {
      return res.status(400).json({ error: 'Ngày ký hợp đồng phải lớn hơn ngày hiện tại' });
    }
    let hopdong = {
      ten_nguoi_mua: req.body.ten_nguoi_mua,
      ten_nguoi_ban: req.body.ten_nguoi_ban,
      gia_tien: req.body.gia_tien,
      ngay_ky: req.body.ngay_ky,
      trang_thai: req.body.trang_thai,
    };
    const hopdongRes = await Hopdong.create(hopdong, {
      fields: [
        "ten_nguoi_mua",
        "ten_nguoi_ban",
        "gia_tien",
        "ngay_ky",
        "trang_thai",
      ],
    });
    res.status(200).json({
      data: hopdongRes,
    });
  } catch (error) {
    next(error);
  }
};



exports.deleteHopdong = async (req, res, next) => {
  const { id } = req.params;

  const deletedHopdong = await Hopdong.destroy({
    where: { id: id },
  });

  if (deletedHopdong === 0) {
    return res.status(404).json({
      message: "hop dong not found",
    });
  }

  res.status(200).json({
    message: "hop dong deleted successfully",
  });
};

exports.updateHopdong = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    // Kiểm tra các trường không được để trống
    if (!req.body.ten_nguoi_mua || !req.body.ten_nguoi_ban || !req.body.gia_tien || !req.body.ngay_ky || !req.body.trang_thai) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }

    const hopdongUpdates = {
      ten_nguoi_mua: req.body.ten_nguoi_mua,
      ten_nguoi_ban: req.body.ten_nguoi_ban,
      gia_tien: req.body.gia_tien,
      ngay_ky: req.body.ngay_ky,
      trang_thai: req.body.trang_thai,
    };

    const [updatedRowCount, updatedHopdong] = await Hopdong.update(hopdongUpdates, {
      where: { id: id },
      returning: true,
    });

    if (updatedRowCount === 0) {
      return res.status(404).json({ error: "Không tìm thấy hợp đồng để cập nhật" });
    }

    res.status(200).json({
      message: "Cập nhật hợp đồng thành công",
      data: updatedHopdong[0],
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật hợp đồng:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật hợp đồng" });
  }
};



