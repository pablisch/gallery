const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
const path = require('path'); 
require('dotenv').config()

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_DB || 'gallery_DEV';
const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.asp5yzo.mongodb.net/${dbName}`;

const imageRoutes = require('./routes/image'); 
const userRoutes = require('./routes/user');
const healthRoutes = require('./routes/health');

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || 'https://gallery-58b4.onrender.com';
console.log('🪧  >>> CORS:', corsOrigin);

const corsOptions = {
  origin: corsOrigin,
};

app.use(cors(corsOptions));

mongoose.connect(mongoDbUrl)
  .then(() => { 
    console.log(`🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`); 
  })
  .catch((error) => { 
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`); 
    console.error(error); 
  });
  
app.use(express.json()); 

app.use('/images', express.static(path.join(__dirname, 'images'))); 

app.use('/api/v1.0/image', imageRoutes); 
app.use('/api/v1.0/user', userRoutes); 
app.use('/api/v1.0/health', healthRoutes); 

module.exports = app; 