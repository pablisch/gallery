const mongoose = require('mongoose');
const Image = require('../models/image');
const imageSeedData = require('./image-seed-data');
require('dotenv').config();

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_TEST_DB || 'gallery';
const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.asp5yzo.mongodb.net/${dbName}`;

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(`🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`);
  })
  .catch((error) => {
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`);
    console.error(error);
  });

const clearImages = async () => {
  await Image.deleteMany({});
};

const insertImages = async () => {
  await Image.insertMany(imageSeedData);
};

// for TEST db => npm run seed:images:test
// for dev/production db => npm run seed:images
const seedImages = async () => {
  try {
    await clearImages();
    await insertImages();
    console.log('Image seeding completed successfully.');
  } catch (error) {
    console.error('Image seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedImages();
