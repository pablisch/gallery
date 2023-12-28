const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/user'); 

exports.signup = (req, res, next) => { 
  const { name, username, email, password, avatar } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      const user = new User({
        name,
        username,
        email,
        password: hash,
        avatar
      });

      user.save()
        .then(() => {
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
            avatar
          });
        })
        .catch(error => res.status(500).json({ error: error }));
    })
    .catch(error => res.status(500).json({ error: error }));
}; 

exports.login = (req, res, next) => { 
  console.log('login')
  const { username, password } = req.body;
  console.log(username, password)
  User.findOne({ username }) 
    .then(user => { 
      if (!user) { 
        return res.status(401).json({ error: 'User not found!' }); 
      } 
      console.log('user found', user)
      bcrypt.compare(password, user.password) 
        .then(valid => { 
          if (!valid) {
            console.log(password, user.password)
            return res.status(401).json({ error: 'Incorrect password!' }); 
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