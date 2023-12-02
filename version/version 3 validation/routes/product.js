const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }));
const Product = require('../models/product');
const Review = require('../models/review');

const Joi = require('joi')
const { validateproduct } = require('../middlewaeServerSidevalidation')

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/index', { products })
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
router.get('/products/new', (req, res) => {
    try {
        res.render('products/new')
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
// for validation we are using 'validateproduct' middleware and we are requiring it in this file const { validateproduct } = require('../middleware')
//                          midware         next midware
router.post('/products', validateproduct, async (req, res) => { // 
    try {
        const { name, img, price, desc } = req.body
        await Product.create({ name, img, price: parseFloat(price), desc })
        res.redirect('/products')
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
router.get('/products/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let findproduct = await Product.findById(id).populate('reviews');//now we are using populate methord to connect the product and reviews model
        res.render(`products/show`, { findproduct })
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
router.get('/products/:id/edit', async (req, res) => {
    try {
        let { id } = req.params
        let findproduct = await Product.findById(id)
        res.render(`products/edit`, { findproduct })
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
router.patch('/products/:id', validateproduct,async (req, res) => { // validateproduct middleware 
    try {
        let { id } = req.params
        let { name, img, price, desc } = req.body
        await Product.findByIdAndUpdate(id, { name, img, price, desc })
        res.redirect(`/products/${id}`)
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})

router.delete('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        // delete all the reviews but thsi is not the good way (but it is right)
        // let pc = await Product.findById(id)
        // for(let productID of pc.reviews){  
        //     await Review.findByIdAndDelete(productID) 
        // }

        // diff way of deleting the reviews


        await Product.findByIdAndDelete(id)
        res.redirect('/products')
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
router.get('/', (req, res) => {
    try {
        res.send('<h1>Home page</h1>')
    } catch (error) {
        res.status(500).render('error', { err: error.message })
    }
})
module.exports = router