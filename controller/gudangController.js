const Gudang = require('../models/gudangModel');

exports.create = async (req, res) => {
  try {
    const gudang = await Gudang.create(req.body);
    res.status(201).json(gudang);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await Gudang.find());
};