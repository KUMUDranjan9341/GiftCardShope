const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from header
  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;  // Attach user data to request
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = auth;
