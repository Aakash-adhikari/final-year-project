require('dotenv').config(); 
const mongoose = require('mongoose');

// Get the MongoDB URI from the environment variable
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
