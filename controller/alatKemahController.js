const alatKemah = require('../models/alatKemahModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.create = async (req, res) => {
  try {
    const data = await alatKemah.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 409,
        message: 'Kode barang sudah digunakan'
      });
    }
    res.status(400).json({ message: err.message });
  }
};



exports.getAll = async (req, res) => {
  const filter = {};

  //Filtering
  if (req.query.kodeBarang) {
    filter.kodeBarang = req.query.kodeBarang;
  }

  if (req.query.nama) {
    filter.nama = {
      $regex: req.query.nama,
      $options: 'i'
    };
  }

  if (req.query.tarifHarian) {
    filter.tarifHarian = Number(req.query.tarifHarian);
  }

  if (req.query.kondisi) {
    filter.kondisi = String(req.query.kondisi);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // Sorting
  let sort = {};

  if (req.query.sort) {
    const sortField = req.query.sort.replace('-', '');
    const sortOrder = req.query.sort.startsWith('-') ? -1 : 1;

    sort[sortField] = sortOrder;
  } else {
    sort = { createdAt: -1 };
  }

  // Projection
  let fields = {};

  if (req.query.fields) {
    req.query.fields.split(',').forEach(field => {
      fields[field.trim()] = 1;
    });
  }

  const totalData = await alatKemah.countDocuments(filter);

  const data = await alatKemah.find(filter, fields)
    .populate('gudangId')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.json({
    status: 200,
    message: 'Data alat kemah berhasil ditampilkan',
    data: data,
    pagination: {
      totalData: totalData,
      totalHalaman: Math.ceil(totalData / limit),
      halamanSekarang: page,
      dataPerHalaman: limit
    }
  });
};


exports.getById = async (req, res) => {
  try {
    const data = await alatKemah.findById(req.params.id)
      .populate('gudangId');

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: 'Data tidak ditemukan'
      });
    }

    res.status(200).json(data);

  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        status: 400,
        message: 'Format ID tidak valid'
      });
    }

    res.status(500).json({
      status: 500,
      message: 'Terjadi kesalahan pada server'
    });
  }
};


exports.update = async (req, res) => {
  const data = await alatKemah.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after', runValidators: true }
  );
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await alatKemah.findByIdAndDelete(req.params.id);
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.status(204).send();
};