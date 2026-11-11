
const mongoose = require('mongoose');

const gudangSchema = new mongoose.Schema({
  kode: { type: String, required: [true, 'kode wajib diisi'], trim: true, unique:true, uppercase: true },
  nama: { type: String, required: [true, 'nama wajib diisi'], trim: true }
});

module.exports = mongoose.model('Gudang', gudangSchema);