exports.getProduct =  (req,res,next) => {
    res.status(200).json({
        success:true,
        message:'This Route will show all products in database'
    })
}