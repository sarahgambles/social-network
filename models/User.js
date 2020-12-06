const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
    userName: {
        type: String,
        
    }
})