const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/fakeuser',async (req,res)=>{
    const user = {
        email : 'parth@gmail.com',
        username:'parthgupta08'
    }
    const newuser = await User.register(user,'gupta123')// syntex . for more function https://www.npmjs.com/package/passport-local-mongoose 
    //                                         password 
    res.send(newuser)
})

router.get('/register',(req,res)=>{

    res.render('auth/signup')
})




module.exports = router