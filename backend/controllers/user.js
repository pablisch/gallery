const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/user'); 

exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password, avatar } = req.body;

    // Check if username is already in use
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log('user already in use');
      return res.status(401).json({ error: 'That username is already taken' });
    }

    // Check if email is already in use
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log('email already in use');
      return res.status(401).json({ error: 'Please use a different email address' });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      username,
      email,
      password: hash,
      avatar,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Include the token in the response
    res.status(201).json({
      message: 'User added successfully!',
      userId: user._id,
      username,
      token,
      avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = (req, res, next) => { 
  console.log('login')
  const { username, password } = req.body;
  console.log(username, password)
  User.findOne({ username }) 
    .then(user => { 
      if (!user) { 
        console.log('user not found')
        return res.status(401).json({ error: 'That username is not in use' }); 
      } 
      console.log('user found', user)
      bcrypt.compare(password, user.password) 
        .then(valid => { 
          if (!valid) {
            console.log(password, user.password)
            return res.status(401).json({ error: 'Username and password do not match' }); 
          } 
          const token = jwt.sign( 
            { userId: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' } 
          ); 
          res.status(200).json({ 
            message: 'User logged in successfully!',
            username: user.username,
            userId: user._id, 
            token,
            avatar: user.avatar
          }); 
        }) 
        .catch(error => res.status(500).json({ error: error }));
    }) 
    .catch(error => res.status(500).json({ error: error })); 
}; 