const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejs = require('ejs-mate') // Express 4.x layout, partial and block template functions for the EJS template engine
const methodOverride = require('method-override') // // for patch, delete and other request because browser cannot read make patch, delete request use to overreide the methord our browes can send only get and post request
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

mongoose.connect('mongodb://0.0.0.0:27017/shopping-app')
    .then(() => console.log("DB connected"))
    .catch((e) => console.log("DB not connected"))

app.engine('ejs', ejs); // ejs // ejs engine
app.set('view engine', 'ejs')// to use ejs as a view engine 
app.set('views', path.join(__dirname, 'views'))// to get the path of views folder 
app.use(express.static(path.join(__dirname, 'public'))) // for static files and these file are store in public folder
app.use(express.urlencoded({ extended: true }))   //to use req.body() , This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser. // https://expressjs.com/en/5x/api.html#app.use
app.use(methodOverride('_method')) // middle ware to use methordoverrider

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 1,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 1 // 1 week time 
    }
}

app.use(session(sessionConfig))
app.use(flash()) // flash 

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(User.serializeUser()) // Generates a function that is used by Passport to serialize users into the session(storing user into the session)
passport.deserializeUser(User.deserializeUser())// Generates a function that is used by Passport to deserialize users into the session(to remove users form session)

passport.use(new LocalStrategy(User.authenticate())); // thsi will auth the user 

app.use((req, res, next) => { // success and error are available to the global level with help of res.local
    res.locals.currentuser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
app.get('/', (req, res) => {
    res.render('home');
});
app.use(productRoutes) // using route 
app.use(reviewRoutes) // using route 
app.use(authRoutes) // using route 



const port = 5000
app.listen(port, () => {
    console.log(`Application started at port number ${port}`)
})  