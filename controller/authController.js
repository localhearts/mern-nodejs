const User = require('../models/users')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

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

    sendToken(user, 200, res)
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

    sendToken(user, 200, res)

})

exports.forgotPassword = catchAsyncErrors( async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email })

    if(!user){
        return next(new ErrorHandler('User not found with this email', 401));
    }

    const resetToken = user.getResetPassword();

    await user.save({ validateBeforeSave: false })

    const resetUrl  = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = ` Your password reset token is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try {

        await sendEmail({
            email: user.email,
            subject: 'Nekyland Brands Recovery Password',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    }catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        await user.save({ validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))


    }

})

exports.resetPassword = catchAsyncErrors( async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() }
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match',400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();

    sendToken(user, 200, res)
    


})

exports.logoutUser = catchAsyncErrors( async (req, res, next) => {

    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout successfully!'
    })

})