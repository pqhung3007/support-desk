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

//* Perform CRUD for single ticket with id in params

/* @description: Get user ticket
@route: GET /api/tickets/:id
@access: private */
const getUserTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    /* get ticket by a specific user */
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    /* not allow a user to see others' ticket */
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Cannot see others' ticket")
    }

    res.status(200).json(ticket)
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

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

/* @description: Get user ticket
@route: DELETE /api/tickets/:id
@access: private */
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    /* get ticket by a specific user */
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    /* not allow a user to see others' ticket */
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Cannot see others' ticket")
    }
    await ticket.remove()

    res.status(200).json({ success: true })
})


/* @description: Get user ticket
@route: PUT /api/tickets/:id
@access: private */
const updateTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    /* get ticket by a specific user */
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    /* not allow a user to see others' ticket */
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Cannot see others' ticket")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})


module.exports = { getTickets, getUserTicket, createTicket, deleteTicket, updateTicket }
