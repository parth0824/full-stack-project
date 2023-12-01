const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    img: {
        type: String,
        require: true,
        default: '/images/defaultProductImg.jpeg'
    },
    price: {
        type: Number,
        min: 0,
        require: true
    },
    desc: {
        type: String,
        trim: true,
        require: true
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product