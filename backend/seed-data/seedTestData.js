const mongoose = require('mongoose');
const Image = require('../models/image');
const User = require('../models/user');
const imageSeedData = require('./image-seed-data-for-tests');
const userSeedData = require('./user-seed-data');
require('dotenv').config();
const bcrypt = require('bcrypt');

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_DB;
const mongoDbUrl = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.asp5yzo.mongodb.net/${dbName}`;

const hashPasswords = async (users) => {
  const saltRounds = 10;
  for (let user of users) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    } catch (error) {
      console.error(
        `Error hashing password for user ${user.username}: ${error}`
      );
      user.password = 'defaultHashedPassword';
    }
  }
  return users;
};

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log(
      `🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`
    );
  })
  .catch((error) => {
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`);
    console.error(error);
  });

const clearUsers = async () => {
  await User.deleteMany({});
};

const clearImages = async () => {
  await Image.deleteMany({});
};

const insertUsers = async () => {
  const hashedUsers = await hashPasswords(userSeedData); // Await the result of hashPasswords
  await User.insertMany(hashedUsers);
};

const insertImages = async () => {
  await Image.insertMany(imageSeedData);
};

const seedUsersAndImages = async () => {
  try {
    await clearUsers();
    await clearImages();
    await insertUsers();
    await insertImages();
    console.log('User & Image seeding completed successfully.');
  } catch (error) {
    console.error('User & image seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedUsersAndImages();
