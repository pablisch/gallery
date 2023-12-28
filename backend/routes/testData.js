const express = require('express');
const router = express.Router();

const testDataCtrl = require('../controllers/testData');

router.post('/reset', testDataCtrl.resetTestData);

module.exports = router;
