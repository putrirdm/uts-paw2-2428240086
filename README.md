## UTS PAW2 – API Penyewaan Alat Kemah
## Deskripsi Project
Project ini merupakan REST API untuk mengelola data alat kemah dan gudang penyimpanan. API dibuat menggunakan Node.js, Express.js, MongoDB, dan Mongoose sebagai penghubung ke database.

## 1. Model Data

Project ini memiliki dua model utama, yaitu:

A. Alat Kemah

Model alatKemah digunakan untuk menyimpan informasi alat kemah dengan field sebagai berikut:

- kodeBarang: Kode unik setiap alat kemah.

- nama: Nama alat kemah.

- tarifHarian: Harga sewa alat kemah per hari.

- kondisi: Kondisi alat kemah (baik, perlu-cek, rusak).

- spesifikasi: Informasi kapasitas dan bahan alat kemah.

- gudangId: Referensi menuju data gudang.

- createdAt: Tanggal data dibuat.

B. Gudang

Model Gudang digunakan untuk menyimpan informasi tempat penyimpanan alat kemah dengan field:

- kode: Kode gudang.

- nama: Nama gudang.

## 2. Alasan Desain Data Model

A. Embedding

Field spesifikasi menggunakan pola embedding karena informasi kapasitas dan bahan merupakan bagian dari detail alat kemah. Kedua informasi tersebut biasanya dibutuhkan secara bersamaan ketika melihat detail alat, sehingga lebih mudah disimpan dalam satu dokumen.

B. Referencing

Model Gudang menggunakan pola referencing melalui field gudangId karena satu gudang dapat menyimpan banyak alat kemah. Dengan cara ini, informasi gudang cukup disimpan satu kali dan dapat dihubungkan dengan beberapa data alat kemah tanpa harus menuliskan data gudang berulang kali.

## 3. Cara Menjalankan Project
Berikut langkah-langkah untuk menjalankan project:
1. Pastikan Node.js dan MongoDB sudah terpasang di komputer.
2. Buka folder project menggunakan Visual Studio Code.
3. Buka terminal pada folder project.
4. Install dependency dengan perintah:
    ```bash
    npm install
    ```
5. Siapkan file .env berdasarkan .env.example dan sesuaikan konfigurasi database serta API Key.
6. Jalankan server menggunakan perintah:
    ```bash
    npm run dev
    ```
7. Jika berhasil, server akan berjalan pada:
    ```bash
    http://localhost:3000
    ```

Pengujian endpoint dilakukan menggunakan Postman. Untuk request POST, PUT, dan DELETE, gunakan API Key sesuai konfigurasi project. Request GET tidak memerlukan API Key berdasarkan route yang telah dibuat.

## 4. Hasil Pengujian Endpoint
Pengujian dilakukan menggunakan Postman untuk memastikan setiap endpoint dapat berjalan sesuai dengan fungsi dan ketentuan yang telah dibuat.

| No. | Request | Status Diharapkan | Status Didapat | Sesuai |
|---|---|---|---|---|
| 1 | POST `/gudang` | 201 | 201 | Ya |
| 2 | POST `/gudang` dengan kode yang sama | 409 | 409 | Ya |
| 3 | GET `/gudang` | 200 | 200 | Ya |
| 4 | POST `/alat-kemah` | 201 | 201 | Ya |
| 5 | POST `/alat-kemah` dengan kode barang yang sama | 409 | 409 | Ya |
| 6 | POST `/alat-kemah` tanpa `nama` | 400 + detail | 400 + detail | Ya |
| 7 | POST `/alat-kemah` dengan `tarifHarian` negatif | 400 | 400 | Ya |
| 8 | GET `/alat-kemah` | 200, array | 200, array | Ya |
| 9 | GET `/alat-kemah?kondisi=baik` | 200, hanya data cocok | 200 | Ya |
| 10 | GET `/alat-kemah?kondisi=tidak-ada` | 200, `[]` | 200, `[]` | Ya |
| 11 | GET `/alat-kemah?sort=tarifHarian` | 200, urut menaik | 200 | Ya |
| 12 | GET `/alat-kemah/:id` | 200, `gudangId` ter-populate | 200 | Ya |
| 13 | GET `/alat-kemah/:id` (ID tidak ada) | 404 | 404 | Ya |
| 14 | GET `/alat-kemah/abc` | 400 | 400 | Ya |
| 15 | GET `/rute-tidak-ada` | 404 | 404 | Ya |

## 5. Pengujian API

Pengujian endpoint dilakukan menggunakan Postman untuk memastikan setiap fitur berjalan sesuai fungsinya.

Beberapa status respons yang digunakan:

| Status | Keterangan                                      |
|--------|-------------------------------------------------|
| 200    | Permintaan berhasil                             |
| 201    | Data berhasil ditambahkan                       |
| 204    | Data berhasil dihapus                           |
| 400    | Data tidak sesuai validasi atau format ID salah |
| 401    | API Key tidak valid atau tidak tersedia         |
| 404    | Data atau endpoint tidak ditemukan              |
| 409    | Terjadi duplikasi kode barang                   |
| 500    | Terjadi kesalahan pada server                   |

## 6. Teknologi yang Digunakan

- Node.js

- Express.js

- MongoDB

- Mongoose

- Postman

- Visual Studio Code