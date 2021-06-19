const jwt = require('jsonwebtoken')
const User = require('../models/users')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const { token } = req.cookies;

    if(!token) {
        return next(new ErrorHandler('Permission dennied please login to access this resource',401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id)

    next()

    
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next)  => {
        if(!roles.includes(req.user.roles)) {
            return next(
            new ErrorHandler(`Roles (${req.user.roles}) is not allowed to access this resource`,403))
        }
        next()
    }
}