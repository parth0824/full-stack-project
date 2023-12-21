const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { isLoggedIn } = require('../middleware')
router.get('/register', (req, res) => {
    res.render('auth/signup');
});
router.post('/register', async (req, res) => { 
    try {
        const { username, password, email ,role} = req.body;
        const user = new User({ username, email,role });
        const newUser = await User.register(user, password);
        req.login(newUser, function (err) {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome , You are Registered Successfully');
            return res.redirect('/products');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});
router.get('/login',  (req, res) => {
    res.render('auth/login');
});



router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        // console.log(req.session.returnUrl)
        let redirectUrl = req.session.returnUrl || '/products'

        req.flash('success', `Welcome Back  ${req.user.username} Again!!`);
        console.log('Logged In Succcessfully!'); 

        if(redirectUrl && redirectUrl.indexOf('review') != -1){

            redirectUrl = redirectUrl.split('/');
            redirectUrl.pop();
            redirectUrl = redirectUrl.join('/'); 
        } 
        delete req.session.returnUrl
        res.redirect(redirectUrl);
    });





router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Good Bye!!');
    res.redirect('/products');
})
module.exports = router;