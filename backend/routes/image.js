const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

const imageCtrl = require('../controllers/image'); 

router.get('/', auth, imageCtrl.getAllImages);  

router.post('/', auth, multer, imageCtrl.addImage); 

router.get('/:id', auth, imageCtrl.getSingleImage); 

router.put('/:id', auth, multer, imageCtrl.modifyImage); 

router.delete('/:id', auth, imageCtrl.deleteImage); 

module.exports = router; 