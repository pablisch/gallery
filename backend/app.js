const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const path = require('path'); 

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_TEST_DB || 'gallery';

const stuffRoutes = require('./routes/stuff'); 
const userRoutes = require('./routes/user');

const app = express(); 

app.use(cors());

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.asp5yzo.mongodb.net/${dbName}?retryWrites=true&w=majority`)
  .then(() => { 
    console.log('🥳 Successfully connected to MongoDB Atlas! 🌎'); 
  })
  .catch((error) => { 
    console.log('😖 Unable to connect to MongoDB Atlas! ❌'); 
    console.error(error); 
  });
  
app.use(express.json()); 

app.use('/images', express.static(path.join(__dirname, 'images'))); 

app.use('/api/stuff', stuffRoutes); 
app.use('/api/auth', userRoutes); 

module.exports = app; 