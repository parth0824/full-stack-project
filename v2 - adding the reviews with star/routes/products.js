const express = require('express')
const router = express.Router();

router.use(express.urlencoded({ extended: true }))


const Product = require('../models/product')

router.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('../views/products/index', { products })
})


router.get('/products/new', (req, res) => {
    res.render('../views/products/new')
})


router.post('/products', async (req, res) => {
    const { name, img, price, desc } = req.body
    await Product.create({ name, img, price, desc });
    res.redirect('/products')
})


router.get('/products/:productID', async (req, res) => {
    const { productID } = req.params
    // const product = await Product.findById(productID)v1

    const product = await Product.findById(productID).populate('reviews') // v2 by doing this ,our Product have reviews feild which is an array , array id will be replaced by the actual data from the review model 
    res.render('./products/show', { product })
})


router.get('/products/:productID/edit', async (req, res) => {
    const { productID } = req.params
    const product = await Product.findById(productID)
    res.render('products/edit', { product });
})

const methodOverride = require('method-override') // use to overreide the methord our browes can send only get and post request
router.use(methodOverride('_method')) // middle ware to use methordoverrider

router.patch('/products/:productID', async (req, res) => {

    const { productID } = req.params
    const { name, img, price, desc } = req.body
    await Product.findByIdAndUpdate(productID, { name, img, price, desc })
    res.redirect(`/products/${productID}`)


})

router.delete('/products/:productID', async (req, res) => {

    const { productID } = req.params
    const { name, img, price, desc } = req.body
    await Product.findByIdAndDelete(productID)
    res.redirect('/products')


})

 

module.exports = router