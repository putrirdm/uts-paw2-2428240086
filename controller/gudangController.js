const Gudang = require('../models/gudangModel');

exports.create = async (req, res) => {
  try {
    const gudang = await Gudang.create(req.body);
    res.status(201).json(gudang);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 409,
        message: 'Kode gudang sudah digunakan'
      });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await Gudang.find());
};