const express = require('express');
const router = express.Router();

const testDataCtrl = require('../controllers/testData');

router.get('/reset', testDataCtrl.resetTestData);

module.exports = router;
