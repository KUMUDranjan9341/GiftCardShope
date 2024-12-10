const mongoose = require('mongoose');
require('dotenv').config();

const con= mongoose.connect(process.env.DB)
.then(() => {
  console.log('Database connection successful!');
})
.catch((error) => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
});

module.exports =con