
const mongoose = require('mongoose');

const spesifikasiSchema = new mongoose.Schema({
  kapasitas: String,
  bahan: String,
}, { _id: false });

const alatKemahSchema = new mongoose.Schema({
    kodeBarang: {
    type: String,
    required: [true, 'kodeBarang wajib diisi'],
    trim: true,
    unique: true
  },

  nama: { 
    type: String, 
    required: [true, 'nama wajib diisi'], 
    trim: true 
  },

  tarifHarian: {
    type: Number,
    required: [true, 'tarifHarian wajib diisi'],
    min : 0
  },

  kondisi: {
    type: String,
    required: [true, 'kondisi wajib diisi'],
    enum: ['baik', 'perlu-cek', 'rusak'],
    trim: true
  },

  spesifikasi: spesifikasiSchema,

  gudangId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Gudang' },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('alatKemah',alatKemahSchema
);