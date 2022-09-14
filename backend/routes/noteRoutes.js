const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, createNote } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')

/* route('/') can chain on multiple methods */
router.route('/').get(protect, getNotes).post(protect, createNote)


module.exports = router

//? mergeParams preserve the req.params value from the parent router
//? /api/tickets/:ticketId/notes