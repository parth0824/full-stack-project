const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
router.get('/register', (req, res) => {
    res.render('auth/signup')
})
router.post('/register', async (req, res) => { // to register the user 
    const { username, password, email } = req.body;
    const user = new User({ username, email });
    const newuser = await User.register(user, password) // passport-local-mongoose method -> npmjs.com/package/passport-local-mongoose
    res.send(newuser)
})
router.get('/login', async (req, res) => {   // to login the user  
    res.render('auth/login')
})


router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureMessage: true,
            failureFlash: true
        }),
    (req, res) => {
        req.flash('success', 'Welcome back again!');
        res.redirect('/products');
    }); 
router.get('/logout', (req, res) => {
    try {
        req.logout((err) => {
            if (err) { return next(err); }
            req.flash('success', 'GoodBye!');
            res.redirect('/login');
        });
    }
    catch (e) {
        req.flash('error', 'something went wrong');
        res.redirect('/products');
    }
})
module.exports = router;