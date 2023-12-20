const mongoose = require('mongoose');
const User = require('../models/user');
const UserSeedData = require('./user-seed-data');
const bcrypt = require('bcrypt');
require('dotenv').config()

const dbPassword = process.env.MONGODB_PW;
const dbUser = process.env.MONGODB_USER;
const dbName = process.env.MONGODB_TEST_DB || 'gallery';
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

mongoose.connect(mongoDbUrl)
  .then(() => { 
    console.log(`🥳 Successfully connected to MongoDB Atlas ${dbName} database! 🌎`); 
  })
  .catch((error) => { 
    console.log(`😖 Unable to connect to MongoDB Atlas ${dbName} database! ❌`); 
    console.error(error); 
  });

const clearUsers = async () => {
  await User.deleteMany({});
};

const insertSeedUsers = async () => {
  const hashedUsers = await hashPasswords(UserSeedData); // Await the result of hashPasswords
  await User.insertMany(hashedUsers);
};

// for TEST db => npm run seed:users:test
// for dev/production db => npm run seed:users
const seedUsers = async () => {
  try {
    await clearUsers();
    await insertSeedUsers();
    console.log('User seeding completed successfully.');
  } catch (error) {
    console.error('User seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

seedUsers();
