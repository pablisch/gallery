const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Image = require('../models/image');
const imageSeedData = require('../seed-data/image-seed-data-for-tests');
const userSeedData = require('../seed-data/user-seed-data');

exports.resetUsersTestData = async (req, res, next) => {
  if (process.env.MONGODB_DB !== 'gallery_TEST') {
    return res.status(401).json({ error: 'Not authorized!' });
  }
  try {
    await clearUsers();
    await insertUsers();
    console.log('User seeding completed successfully.');
    res.status(201).json({ message: 'User seeding completed successfully.' });
  } catch (error) {
    console.error('User seeding failed:', error);
    res.status(500).json({ error: 'User seeding failed!' });
  } 
};

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
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        console.log('user', user.username, 'has hashed PW', hashedPassword);
        return { ...user, password: hashedPassword };
      })
    );
    return hashedUsers;
  } catch (error) {
    console.error('Error hashing passwords:', error);
    return users.map((user) => ({ ...user, password: 'defaultHashedPassword' }));
  }
};


const clearUsers = async () => {
  await User.deleteMany({});
};

const clearImages = async () => {
  await Image.deleteMany({});
};

const insertUsers = async () => {
  const hashedUsers = await hashPasswords(userSeedData);
  await User.insertMany(hashedUsers);
};

const insertImages = async () => {
  await Image.insertMany(imageSeedData);
};
