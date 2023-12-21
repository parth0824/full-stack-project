const Product = require('./models/product');
const { productSchema, reviewSchema } = require('./schemas');


module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.originalUrl)
    req.session.returnUrl = req.originalUrl
    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to login first to do that!');
        return res.redirect('/login');
    }
    next();
}


module.exports.validateProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, img, desc, price } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',')
        return res.render('error', { err: msg });
    }
    next();
}


module.exports.validateReview = (req, res, next) => {

    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',')
        // console.log(msg);
        return res.render('error', { err: msg });
    }
    next();
}




module.exports.isSeller = (req, res, next) => {
    if (!req.user.role) {
        req.flash('error', 'You dont have permission to do that !!!! you are a buyer not seller')
        return res.redirect('/products')
    }
    else if (req.user.role != 'Seller') {
        req.flash('error', 'You dont have permission to do that !!!! you are a buyer not seller')
        return res.redirect('/products')
    }
    next()
}


module.exports.isProductAuthor = async (req, res, next) => {
    // getting pro id
    const { id } = req.params
    const product = await Product.findById(id);
    if (!(product.author === req.user._id)) {
        req.flash('error', 'you dont have permission to do that as you are not the author of the product')
        return res.redirect(`/products/${id}`)
    }
    next();
}