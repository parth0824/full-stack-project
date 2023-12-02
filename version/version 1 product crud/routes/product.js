const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }));
const Product = require('../models/product')
router.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products })
})
router.get('/products/new', (req, res) => {
    res.render('products/new')
})
router.post('/products', async (req, res) => {
    const { name, img, price, desc } = req.body
    await Product.create({ name, img, price: parseFloat(price), desc })
    res.redirect('/products')
})
router.get('/products/:id', async (req, res) => {
    let { id } = req.params;
    let findproduct = await Product.findById(id);

    res.render(`products/show`, { findproduct })


})

router.get('/products/:id/edit', async (req, res) => {
    let { id } = req.params
    let findproduct = await Product.findById(id)
    res.render(`products/edit`, { findproduct })
})
router.patch('/products/:id', async (req, res) => {
    let {id} = req.params
    let {name,img,price,desc} = req.body
    await Product.findByIdAndUpdate(id,{name,img,price,desc})
    res.redirect(`/products/${id}`)
})

router.delete('/products/:id',async (req,res)=>{
    let {id} = req.params
    await Product.findByIdAndDelete(id) 
    res.redirect('/products')

})
 
router.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})
module.exports = router
