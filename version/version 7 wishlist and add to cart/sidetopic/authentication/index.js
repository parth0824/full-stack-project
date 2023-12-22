const express = require('express')
const app = express()


const path = require('path')
const port = 5000
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/authdemo')
    .then(() => console.log('connected'))
    .catch((e) => console.log(e.message))


// bcrypt 
const bcrypt = require('bcrypt')
const User = require('./models/user')

// for persistent login we are using sessions
const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))



app.get('/register', (req, res) => {
    res.render('signup')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    // res.send(`username : ${username} and password : ${password}`)
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    const newUser = new User({ username, password: hash })
    await newUser.save()
    res.redirect('/login')
})

const requireLogin = (req,res,next) =>{
    if (!req.session.user_id) {
        return res.send('you need to login first')
    }
    next();
}


app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
    if (user) {
        const isValidUser = await bcrypt.compare(password, user.password)

        if (!isValidUser) {

            return res.send('<h1>Password is not correct</h1>')
        }
    }

    req.session.user_id = user._id






    res.redirect('/secret');
})


app.get('/secret',requireLogin, (req, res) => {
    
    res.send('<h1>This is secret you need to login first</h1>')
})


app.get('/logout',(req,res)=>{
    if (req.session.user_id) {
        req.session.destroy()
        
        res.redirect('/login')
    }
    res.send('you are not login ')
    
})
app.get('/', (req, res) => {
    res.send('<h1>home route</h1>')
})


app.listen(3000, (req, res) => {
    console.log('Server started')
})

