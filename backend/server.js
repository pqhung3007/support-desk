const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandle } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 8080
const app = express()

/* Connect to the database */
connectDB()

/* Object returned will be undefined if there are not these 2 lines
Get the body parser
*/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Hung's support desk" })
})

// connect api/... to the required router file
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandle)

app.listen(port, () => console.log(`Running on port ${port}`))