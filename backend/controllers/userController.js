const asyncHandler = require('express-async-handler')
/* 
@description: Register a new user
@route: /api/users
@access: public
*/
const registerUser = asyncHandler((req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    res.send('Register route')
})

/* 
@description: Log a user in
@route: /api/users/login
@access: public
*/
const loginUser = asyncHandler((req, res) => {
    res.send('Login route')
})

module.exports = { registerUser, loginUser }