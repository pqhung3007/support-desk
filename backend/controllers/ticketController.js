const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const Ticket = require('../models/ticket')

/* @description: Get user ticket
@route: GET /api/tickets
@access: private */
const getTickets = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get tickets' })
})

/* @description: create new ticket
@route: POST /api/tickets
@access: private */
const createTicket = asyncHandler(async (req, res) => {
    res.status(201).json({ message: 'create tickets' })
})

module.exports = { getTickets, createTicket }
