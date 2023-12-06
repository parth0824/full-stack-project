const express = require('express')
const app = express()



const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.get('/count', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    }
    else {
        req.session.count = 1;
    }
    res.send(`<h1>You have visited this page ${req.session.count} times.</h1>`)
})


app.get('/setname', (req, res) => {
    console.log(req.session)
    req.session.username = 'Parth'
    res.redirect('/greet')
})

app.get('/greet', (req, res) => {
    const { username = 'anonymous'} = req.session; 
    res.send(`<h1>Hello from ${username}</h1>`)
})



app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})



app.listen(3000, (req, res) => {
    console.log('Server started');
})