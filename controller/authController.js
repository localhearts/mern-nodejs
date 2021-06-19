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

    res.status(201).json({
        success: true,
        user,
    })
})