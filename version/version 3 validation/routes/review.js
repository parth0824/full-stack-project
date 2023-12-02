const express = require('express')
const router = express.Router()
// connecting the product and the review model
const Product = require('../models/product')
const Review = require('../models/review')
const { validateReview } = require('../middlewaeServerSidevalidation')
router.post('/products/:id/reviews', validateReview, async (req, res) => {
    try {


        const { id } = req.params
        const { rating, comment } = req.body
        const product = await Product.findById(id);
        
        const revieww = new Review({ rating, comment })
        product.reviews.push(revieww)
        await revieww.save()
        await product.save()
        res.redirect(`/products/${id}`)
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
module.exports = router