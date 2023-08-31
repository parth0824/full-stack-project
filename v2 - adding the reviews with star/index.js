const express = require('express')
const app = express()
const path = require('path')


const ejsMate = require('ejs-mate')
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({extended:true})) 
app.use(express.static(path.join(__dirname,'public'))) 


const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/shopping-app')
    .then(() => console.log('DB connected'))
    .catch((e) => console.log(e))

const methodOverride = require('method-override') // use to overreide the methord our browes can send only get and post request
app.use(methodOverride('_method')) // middle ware to use methordoverrider

const seedDB = require('./seed')
// seedDB()


const productRoute = require('./routes/products')
const reviewRoute = require('./routes/review')
app.use(productRoute)
app.use(reviewRoute)






app.get("/",(req,res)=>{
    res.send("<h1>This is connected </h1>")
})

app.listen(3000, () => {
    console.log('server started')
})

