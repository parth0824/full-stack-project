// this is a syntex of joi to validate the data at server side 
const Joi = require('joi')
// chking product
// step 1 to create schema 
// step 2 in middleware.js
module.exports.productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.number().min(0).required(),
    desc: Joi.string().required()
})
// chking review
module.exports.reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().required(),
})