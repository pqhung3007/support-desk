const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            /* Get token from header: Bearer [space] token */
            token = req.headers.authorization.split(' ')[1]
            /* Verify token */
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            /* Get user from token, exclude password */
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            req.status(401)
            throw new Error('Not authorized!')
        }
    }

    if (!token) {
        req.status(401)
        throw new Error('Not authorized!')
    }
})

module.exports = { protect }