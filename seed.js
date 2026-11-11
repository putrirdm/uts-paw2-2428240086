
const mongoose = require('mongoose');
require('dotenv').config();

const Gudang = require('./models/gudangModel');
const AlatKemah = require('./models/alatKemahModel');

const dataGudang = [
  { kode: 'GD01', nama: 'Gudang Utama' },
  { kode: 'GD02', nama: 'Gudang Peralatan Camping' },
  { kode: 'GD03', nama: 'Gudang Perlengkapan Outdoor' },
  { kode: 'GD04', nama: 'Gudang Peralatan Pendakian' },
  { kode: 'GD05', nama: 'Gudang Cadangan' }
];

const dataAlatKemah = [
  {
    kodeBarang: 'KMH-01',
    nama: 'Tenda Camping Kapasitas 4 Orang',
    tarifHarian: 50000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '4 orang',
      bahan: 'Polyester Waterproof'
    },
    gudangKode: 'GD01'
  },
  {
    kodeBarang: 'KMH-02',
    nama: 'Sleeping Bag Outdoor',
    tarifHarian: 15000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '1 orang',
      bahan: 'Polyester dan Dakron'
    },
    gudangKode: 'GD01'
  },
  {
    kodeBarang: 'KMH-03',
    nama: 'Matras Camping Lipat',
    tarifHarian: 10000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '1 orang',
      bahan: 'EVA Foam'
    },
    gudangKode: 'GD02'
  },
  {
    kodeBarang: 'KMH-04',
    nama: 'Kompor Portable Camping',
    tarifHarian: 20000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '1 tabung gas portable',
      bahan: 'Stainless Steel'
    },
    gudangKode: 'GD02'
  },
  {
    kodeBarang: 'KMH-05',
    nama: 'Kursi Lipat Outdoor',
    tarifHarian: 12000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '1 orang',
      bahan: 'Aluminium dan Kain Oxford'
    },
    gudangKode: 'GD03'
  },
  {
    kodeBarang: 'KMH-06',
    nama: 'Meja Lipat Camping',
    tarifHarian: 25000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '4 orang',
      bahan: 'Aluminium'
    },
    gudangKode: 'GD03'
  },
  {
    kodeBarang: 'KMH-07',
    nama: 'Carrier Gunung 60 Liter',
    tarifHarian: 35000,
    kondisi: 'perlu-cek',
    spesifikasi: {
      kapasitas: '60 liter',
      bahan: 'Cordura'
    },
    gudangKode: 'GD04'
  },
  {
    kodeBarang: 'KMH-08',
    nama: 'Headlamp LED',
    tarifHarian: 10000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '1 unit',
      bahan: 'Plastik ABS'
    },
    gudangKode: 'GD04'
  },
  {
    kodeBarang: 'KMH-09',
    nama: 'Nesting Cooking Set',
    tarifHarian: 18000,
    kondisi: 'baik',
    spesifikasi: {
      kapasitas: '2 orang',
      bahan: 'Aluminium Anodized'
    },
    gudangKode: 'GD05'
  },
  {
    kodeBarang: 'KMH-10',
    nama: 'Trekking Pole',
    tarifHarian: 15000,
    kondisi: 'rusak',
    spesifikasi: {
      kapasitas: '1 pasang',
      bahan: 'Aluminium Alloy'
    },
    gudangKode: 'GD05'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log('MongoDB berhasil terhubung');

    // Menghapus data lama
    await AlatKemah.deleteMany({});
    await Gudang.deleteMany({});

    // Memasukkan data Gudang
    const gudangTersimpan = await Gudang.insertMany(dataGudang);

    // Membuat relasi gudangId
    const alatDenganGudang = dataAlatKemah.map((alat) => {
      const gudang = gudangTersimpan.find(
        (item) => item.kode === alat.gudangKode
      );

      return {
        kodeBarang: alat.kodeBarang,
        nama: alat.nama,
        tarifHarian: alat.tarifHarian,
        kondisi: alat.kondisi,
        spesifikasi: alat.spesifikasi,
        gudangId: gudang._id
      };
    });

    // Memasukkan data Alat Kemah
    await AlatKemah.insertMany(alatDenganGudang);

    console.log('Seed berhasil dijalankan!');
    console.log('Jumlah Gudang:', gudangTersimpan.length);
    console.log('Jumlah Alat Kemah:', alatDenganGudang.length);
    console.log('Total seluruh data:', gudangTersimpan.length + alatDenganGudang.length);

  } catch (error) {
    console.error('Seed gagal:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Koneksi MongoDB ditutup');
  }
}

seedDatabase();
