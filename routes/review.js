const express = require('express')
const router = express.Router();

const Review = require('../models/review')
const Product = require('../models/product')

router.post('/products/:productID/review', async (req, res) => {
    const { productID } = req.params
    const product = await Product.findById(productID)


    const { rating, comment } = req.body
    // const review = new Review({rating:rating,comment:comment});
    const review = new Review({ ...req.body });// new thing -> spread operator -> code sugar :)
    await review.save() // to save in the database 

    //now we will add review in product array(reviews)

    product.reviews.push(review)
    await product.save() // to save in the database 

    res.redirect(`/products/${productID}`)


})



module.exports = router


