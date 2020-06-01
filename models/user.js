const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "name": String,
    "email": String,
    "age": Number,
    "gender": String,
    "createddate": Number,
    "modifieddate": Number,
    "password": String,
    "role": String
});

module.exports = mongoose.model('users', userSchema);