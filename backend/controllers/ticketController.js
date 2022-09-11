const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const Ticket = require('../models/ticket')

/* @description: Get user ticket
@route: GET /api/tickets
@access: private */
const getTickets = asyncHandler(async (req, res) => {
    /* get user using id store in JWT */
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

/* @description: create new ticket
@route: POST /api/tickets
@access: private */
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product or description')
    }

    /* get user using id store in JWT */
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

module.exports = { getTickets, createTicket }
