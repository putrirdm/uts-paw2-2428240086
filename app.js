require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose'); 
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const alatKemahRoutes= require("./routes/alatKemahRoutes");
const gudangRoutes = require('./routes/gudangRoutes');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    nama: "Putri Reda Maulidia",
    nim: "2428240086",
    topik: 21,
    namaTopik: "Alat Kemah",
    resource: "/alat-kemah",
    // endpoints: [
    //   "GET /disaster-reports",
    //   "GET /disaster-reports/:id",
    //   "POST /disaster-reports",
    //   "PUT /disaster-reports/:id",
    //   "DELETE /disaster-reports/:id",
    //   "GET /disaster-reports?jenisBencana=banjir"
    // ]
  });
});

app.use("/alat-kemah", alatKemahRoutes);
app.use('/gudang', gudangRoutes);  

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Endpoint tidak ditemukan",
    data: null
  });
});
                       
app.use(errorHandler);

// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`Server berjalan di http://localhost:${PORT}`);
//   });
// }

 module.exports = app;

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });