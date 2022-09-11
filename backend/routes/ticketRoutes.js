const express = require('express')
const router = express.Router()
const { getTickets, createTicket } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

/* route('/') can chain on multiple methods */
router.route('/').get(protect, getTickets).post(protect, createTicket)

module.exports = router