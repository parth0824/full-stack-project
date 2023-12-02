// it is a middleware use to validate the data,  before data go to DB we are rejecting the data if it is not valid
const { productSchema, reviewSchema } = require('./schemasServerSidevalidation')

module.exports.validateproduct = (req, res, next) => {
    const { name, img, price, desc } = req.body
    const { error } = productSchema.validate({ name, img, price, desc })

    if (error) {
        const errormessage = error.details.map((err) => err.message).join(',')
        return res.render('error', { err: errormessage })
    }
    next() // this will call the next middleware fun
}

module.exports.validateReview = (req, res, next) => {
    const { rating, comment } = req.body
    const { error } = reviewSchema.validate({ rating, comment })

    if (error) {
        const errormessage = error.details.map((err) => err.message).join(',')
        return res.render('error', { err: errormessage })
    }
    next() // this will call the next middleware fun
}