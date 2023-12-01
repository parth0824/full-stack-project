const mongoose = require('mongoose')
const products = [
    {
        name:'iphone',
        img:"https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price:65000,
        desc:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        name:'nike shoes',
        img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price:15000,
        desc:"NIKE SHOES is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        name:'watches',
        img:"https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price:25000,
        desc:"Watch is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        name:'pen',
        img:"https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price:150,
        desc:"pen is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
    {
        name:'macBook',
        img:"https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        price:150000,
        desc:"macbook is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system."
    },
]
const Product = require('./models/product')
async function seedDB(){
    try {
        // await Product.deleteMany({}) 
        await Product.insertMany(products)
        console.log(`Data added in the database successfully :)`);
    } catch (error) {
        console.log(`An error occure while seeding the data. The error is -> ${error}`)
    }
}
module.exports = seedDB