const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

const imageCtrl = require('../controllers/image'); 

router.get('/', imageCtrl.getAllImages);  

router.post('/upload', auth, imageCtrl.addImage); 

router.get('/:id', auth, imageCtrl.getSingleImage); 

router.delete('/:id', auth, imageCtrl.deleteImage); 

// router.put('/:id', auth, multer, imageCtrl.modifyImage); 

module.exports = router; 
