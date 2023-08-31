const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
        default:'https://beepeers.com/assets/images/commerces/default-image.jpg'
    },
    price:{
        type:Number,
        min:0
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId, // it is not a string the type is ObjectId
            ref:'Review'
        }
    ]
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product