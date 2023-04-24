const mongoose = require('mongoose');

// Connect to MongoDB
async function connectToDb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todolist');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log("connection error", err);
    }
}

module.exports = { connectToDb } 