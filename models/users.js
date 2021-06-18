const mongoose = require('mongoose')
const validator = require('validator')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required:  [true, 'Please enter your password'],
        minLength: [8, 'Your password must be longer than 6 characters']
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true           
        }
    },
    roles: {
        type: String,
        default: 'users'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date
})

module.exports = mongoose.model('User', usersSchema)