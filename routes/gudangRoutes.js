
const express = require('express');
const router = express.Router();
const gudangController = require('../controller/gudangController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', gudangController.getAll);
router.post('/', cekApiKey, gudangController.create);

module.exports = router;
