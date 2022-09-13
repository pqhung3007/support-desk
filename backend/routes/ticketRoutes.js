const express = require('express')
const router = express.Router()
const { getTickets, getTicketDetail, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

/* route('/') can chain on multiple methods */
router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicketDetail).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router