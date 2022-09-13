import axios from 'axios'

const API_URL = '/api/tickets/'

/* Create new ticket */
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, ticketData, config)
    return response.data
}

/* Get tickets */
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

/* Get tickets */
const getTicketDetail = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + ticketId, config)
    return response.data
}

/* Close ticket */
const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + ticketId, config)
    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicketDetail,
    closeTicket,
}

export default ticketService