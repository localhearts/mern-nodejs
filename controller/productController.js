const Product = require('../models/products')

exports.createProduct = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

}

exports.getProduct =  (req,res,next) => {
    res.status(200).json({
        success:true,
        message:'This Route will show all products in database'
    })
}