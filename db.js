const  mongoose = require('mongoose');

let db = null;

async function connectDB() {
  try {
     await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoose');
  } catch (error) {
    console.error('mongoose connection error:', error);
    process.exit(1);
  }
}

// function getDB() {
//   if (!db) {
//     throw new Error('Database not initialized');
//   }
//   return db;
// }

module.exports = { connectDB };
