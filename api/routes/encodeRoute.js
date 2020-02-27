const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const EncodeControlller = require('../controllers/encodeController');

router.post('/encode', EncodeControlller.encode);
router.get('/encode', EncodeControlller.encode);

module.exports = router;


