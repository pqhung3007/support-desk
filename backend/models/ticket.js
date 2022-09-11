const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    produc: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['Samsung Galaxy S', 'Samsung Watch', 'Samsung Tablet', 'Samsung Earbuds'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description of the issue'],
    },
    status: {
        type: String,
        enum: ['new', 'open', 'closed'],
        default: 'new',
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Ticket', ticketSchema)