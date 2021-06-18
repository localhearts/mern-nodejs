const Product = require('../models/products')

exports.createProduct = async (req,res,next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })

}

exports.getProduct = async (req,res,next) => {

    const product = await Product.find();
    res.status(200).json({
        success:true,
        count: product.length,
        product
        
    })
}