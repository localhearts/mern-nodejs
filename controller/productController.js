const Product = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Features = require('../utils/Features')

exports.createProduct = catchAsyncErrors(async (req,res,next) => {

    req.body.created_by = req.user.name;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

exports.getProduct = catchAsyncErrors(async (req,res,next) => {
    const resPerPage = 5;
    const productCount = await Product.countDocuments()
    const feature = new Features(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)

    const product = await feature.query;
    
    res.status(200).json({
        success:true,
        count: product.length,
        productCount,
        product   
    })
})

exports.getSingleProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    res.status(200).json({
        success:true,
        product  
    })
})
exports.updateProduct = catchAsyncErrors(async (req,res,next) => {

    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product  
    })
})

exports.deleteProduct = catchAsyncErrors(async (req,res,next) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler('Product not found',404))
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product successfully deleted."  
    })
})