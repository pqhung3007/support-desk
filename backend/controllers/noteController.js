const asyncHandler = require('express-async-handler')

const Note = require('../models/note')
const Ticket = require('../models/ticket')

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes)
})

// @desc    Get notes for a ticket
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.ticketId)
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    })
    res.status(200).json(note)
})

module.exports = { getNotes, createNote }