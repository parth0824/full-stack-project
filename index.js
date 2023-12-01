const express = require('express')
const app = express()
const path = require('path')
const port = 5000


app.set('view engine','ejs')// to use ejs as a view engine 
app.set('views',path.join(__dirname,'views'))// to get the path of views folder 

app.use(express.static(path.join(__dirname,'public'))) // for static files and these file are store in public folder



const methodOverride = require('method-override') // // for patch, delete and other request because browser cannot read make patch, delete request use to overreide the methord our browes can send only get and post request
app.use(methodOverride('_method')) // middle ware to use methordoverrider

// ejs engine
let ejs = require('ejs-mate') // Express 4.x layout, partial and block template functions for the EJS template engine
app.engine('ejs',ejs); // ejs 

app.use(express.urlencoded({extended:true}))   //to use req.body() , This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser. // https://expressjs.com/en/5x/api.html#app.use


// connecting the DB
const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/shopping-app')
.then(()=>{
    console.log("DB connected")
})
.catch((e)=>{
    console.log("DB not connected")
}) 


// Adding the predefind data to DB
const seedDB = require('./seed')
// seedDB()


// routes
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
app.use(productRoutes) // useing route 
app.use(reviewRoutes) // useing route 

app.listen(port, () => {
    console.log(`Application started at port number ${port}`)
}) 