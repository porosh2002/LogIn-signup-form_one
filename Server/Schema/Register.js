const mongoose = require('mongoose');
const RegisterUserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:12,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    name:{
        type:String,
        required:true,
        minlength:2,
    }
});
const RegisterUserModel = mongoose.model('User', RegisterUserSchema);
module.exports = RegisterUserModel;