const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

const imageCtrl = require('../controllers/image'); 

// WHEN AUTH REQUIRED FOR VIEWING IMAGES
// router.get('/', auth, imageCtrl.getAllImages);
router.get('/', imageCtrl.getAllImages);  

router.post('/upload', auth, imageCtrl.addImage); 

// WHEN AUTH REQUIRED FOR VIEWING AN IMAGE
// router.get('/:id', auth, imageCtrl.getSingleImage); 
router.get('/:id', imageCtrl.getSingleImage); 

router.delete('/:id', auth, imageCtrl.deleteImage); 

router.put('/:id/comments', imageCtrl.addComment); 

router.put('/:id/likes', imageCtrl.likeImage); 

// router.put('/:id', auth, multer, imageCtrl.modifyImage); 

module.exports = router; 
