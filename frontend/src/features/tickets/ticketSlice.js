import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    tickets: null,
    ticket: null,
}

// Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            /* get user token */
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token)
        } catch (error) {
            console.log(error);
        }
    }
)

// Get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token)
        } catch (error) {
            console.log(error);
        }
    }
)

// Get user tickets
export const getTicketDetail = createAsyncThunk(
    'ticket/getTicket',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTicketDetail(ticketId, token)
        } catch (error) {
            console.log(error);
        }
    }
)

// close ticket (change status)
export const closeTicket = createAsyncThunk(
    'ticket/close',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketId, token)
        } catch (error) {
            console.log(error);
        }
    }
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.ticket = null
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.tickets = action.payload
            })
            .addCase(getTicketDetail.fulfilled, (state, action) => {
                state.ticket = action.payload
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.tickets.map((ticket) => ticket._id === action.payload._id
                    ? (ticket.status = 'closed')
                    : ticket)
            })
    }
})

export default ticketSlice.reducer