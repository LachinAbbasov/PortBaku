const express = require('express');
const { getSalesData } = require('../controllers/salesController');
const router = express.Router();

router.post('/', getSalesData);

module.exports = router;
