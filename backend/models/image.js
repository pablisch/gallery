const mongoose = require('mongoose'); 

const imageSchema = mongoose.Schema({ 
  src: { type: String, required: true }, 
  altText: { type: String, },
  userId: { type: String, required: true }, 
  username: { type: String },
  userAvatar: { type: String },
  comments: [],
  likes: [],
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema); 
