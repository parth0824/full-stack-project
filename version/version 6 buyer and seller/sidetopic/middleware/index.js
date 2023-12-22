const express = require('express')
const app = express()

// https://expressjs.com/en/guide/using-middleware.html 
app.use((req, res, next) => {
    // res.send('app.use middleware')
    console.log('my 1st middleware')
    next()
})

const verify = (req,res,next)=>{
    const {password} = req.query
    if(password != 'Cough150ml'){
        return res.send('<h1>Invalid password</h1>')
    }
    next()


}

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

app.get('/parth', (req, res, next) => {
 
    res.send('<h1>my 2nd middleware</h1>')
    
})
app.get('/secret',verify,(req,res)=>{
    res.send('<h1>I have not taken the bath from 1 week :)</h1>')
})
app.listen(3000, (req, res) => {
    console.log('Server started at 3000')
})