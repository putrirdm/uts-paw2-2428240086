
const express = require('express');
const router = express.Router();
const alatKemahController = require('../controller/alatKemahController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', alatKemahController.getAll);
router.get('/:id', alatKemahController.getById);
router.post('/', cekApiKey, alatKemahController.create);
router.put('/:id', cekApiKey, alatKemahController.update);
router.delete('/:id', cekApiKey, alatKemahController.remove);

module.exports = router;
