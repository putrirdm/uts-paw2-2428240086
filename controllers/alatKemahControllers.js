const alatKemah = require('../models/alatKemahModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.create = async (req, res) => {
  try {
    const data = await alatKemah.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.getAll = async (req, res) => {
  const filter = {};

  // Filtering
  if (req.query.kota) {
    filter['alamat.kota'] = String(req.query.kota);
  }

  if (req.query.jenisBencana) {
    filter.jenisBencana = String(req.query.jenisBencana).toLowerCase();
  }

  if (req.query.tingkatKeparahan) {
    filter.tingkatKeparahan = String(req.query.tingkatKeparahan).toLowerCase();
  }

  if (req.query.lokasi) {
    filter.lokasi = String(req.query.lokasi);
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
    sort = { tanggal: -1 };
  }

  // Projection
  let fields = {};

  if (req.query.fields) {
    req.query.fields.split(',').forEach(field => {
      fields[field.trim()] = 1;
    });
  }

  const totalData = await laporanBencana.countDocuments(filter);

  const data = await laporanBencana.find(filter, fields)
    .populate('petugas')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.json({
    status: 200,
    message: 'Data laporan bencana berhasil ditampilkan',
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
  const data = await laporanBencana.findById(req.params.id).populate('petugas');
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await laporanBencana.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after', runValidators: true }
  );
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await laporanBencana.findByIdAndDelete(req.params.id);
  if (!data) throw errorHttp(404, 'Data tidak ditemukan');
  res.status(204).send();
};