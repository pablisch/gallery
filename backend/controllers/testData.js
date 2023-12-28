const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Image = require('../models/image');
const imageSeedData = require('../seed-data/image-seed-data-for-tests');
const userSeedData = require('../seed-data/user-seed-data');

exports.resetTestData = async (req, res, next) => {
  if (process.env.MONGODB_DB !== 'gallery_TEST') {
    return res.status(401).json({ error: 'Not authorized!' });
  }
  try {
    await clearUsers();
    await clearImages();
    await insertUsers();
    await insertImages();
    console.log('User & Image seeding completed successfully.');
    res.status(201).json({ message: 'User & Image seeding completed successfully.' });
  } catch (error) {
    console.error('User & image seeding failed:', error);
    res.status(500).json({ error: 'User & image seeding failed!' });
  } 
};

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
