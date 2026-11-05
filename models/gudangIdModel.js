
const mongoose = require('mongoose');

const gudangIdSchema = new mongoose.Schema({
  nama: { type: String, required: [true, 'nama wajib diisi'], trim: true },
  //jabatan: { type: String, required: [true, 'jabatan wajib diisi'], trim: true }
});

module.exports = mongoose.model('Gudang', gudangIdSchema);