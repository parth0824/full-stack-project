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
// we should write before compiling the model
// mongoosh middleware (post middleware) to delete the review when we delete the product form the webdite
productSchema.post('findOneAndDelete', async function (product) {
    if (product.reviews.length > 0) { 
        const Review = require('../models/review')
        await Review.deleteMany({ _id: { $in: product.reviews } }); // this will delete all the review of the product 
        // console.log('Review deleted')
    }
})


const Product = mongoose.model('Product', productSchema)
module.exports = Product