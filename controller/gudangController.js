const gudangId = require('../models/gudangIdModel');

exports.create = async (req, res) => {
  try {
    const gudangId = await gudangId.create(req.body);
    res.status(201).json(gudangId);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await gudangId.find());
};