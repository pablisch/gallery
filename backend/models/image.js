const mongoose = require('mongoose'); 

const imageSchema = mongoose.Schema({ 
  src: { type: String, required: true }, 
  altText: { type: String, },
  userId: { type: String, required: true }, 
});

module.exports = mongoose.model('Image', imageSchema); 
