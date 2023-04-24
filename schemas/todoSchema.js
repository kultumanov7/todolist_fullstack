const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        enum: ["todo", "done", "trash"],
    }
});

module.exports = {todoSchema}