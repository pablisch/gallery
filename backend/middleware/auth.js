const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => { 
  console.log('header-auth:', req.headers.authorization)
  console.log('body:', req.body)
  try { 
    const token = req.headers.authorization.split(' ')[1]; // get the token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
    const userId = decodedToken.userId; 
    // req.auth = { userId: userId }; 
    if (req.body.userId && req.body.userId !== userId) { 
      throw 'Invalid user ID'; 
    } else { 
      console.log('I passed by line 13 of auth')
      next(); 

    } 
  } catch { 
    console.log('I passed by line 18 of auth - in the catch block')
    res.status(401).json({ 
      error: new Error('Invalid request!') 
    }); 
  } 
}; 