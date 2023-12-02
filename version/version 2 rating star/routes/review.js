const express = require('express')
const router = express.Router()
// connecting the product and the review model
const Product = require('../models/product')
const Review = require('../models/review')


router.post('/products/:id/reviews', async (req, res) => {
    const { id } = req.params
    const { rating, comment } = req.body 
    const product = await Product.findById(id);     
    const revieww = new Review({ rating, comment }) 
    product.reviews.push(revieww) 
    await revieww.save()
    await product.save()
    res.redirect(`/products/${id}`)
})

// async function deleteReviews(){
//     console.log('review deleted successfull')
//     await Review.deleteMany({})
// }
// deleteReviews()



module.exports = router