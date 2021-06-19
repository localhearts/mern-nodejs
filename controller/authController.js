const User = require('../models/users')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

exports.registerUsers = catchAsyncErrors(async (req,res,next) => {
    
    const { name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: '/uploads/2018/01/765-default-avatar',
            url: 'https://sman93jkt.sch.id/wp-content/uploads/2018/01/765-default-avatar.png'
        }
    })

    const token =  user.getJwtToken();

    res.status(201).json({
        success: true,
        token,
        user
    })
})

exports.loginUsers = catchAsyncErrors(async (req,res,next) => {

    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter Email & Password', 401));
    }

    const user =  await User.findOne({ email }).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token,
        user
    })

})