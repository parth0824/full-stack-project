const express = require('express')
const app = express() 
const cookieParser = require('cookie-parser')
//app.use(cookieParser())/// middle ware function
app.use(cookieParser('thisisasecretkey')); // middle ware to use signed cookies

app.get('/setcookie',(req,res)=>{
    res.cookie('mode','dark');
    res.cookie('location','agra');
    res.cookie('username','parth');
    res.send('<h1>Dark mode ON</h1>')
})
// normal cookie
app.get('/seeCookies',(req,res)=>{ 
    res.send(req.cookies)
})
// signed cookie
app.get('/getsignercookies',(req,res)=>{
    res.cookie('fruit','guava',{signed:true})
    res.send(req.signedCookies)
    // res.send('<h1>signed cookies</h1>')
})
app.get('/',(req,res)=>{
    res.send('<h1>Home page</h1>')

})

app.listen(4000,(req,res)=>{
    console.log('Server started')
})