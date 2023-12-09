const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose'); // v6 
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
    }, 
})

userSchema.plugin(passportLocalMongoose);// v6

const User = mongoose.model('User',userSchema)

module.exports = User