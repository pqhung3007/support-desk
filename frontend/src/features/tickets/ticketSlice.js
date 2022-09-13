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

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
})

export default ticketSlice.reducer