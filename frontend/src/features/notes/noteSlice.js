import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
    notes: null
}

/* Get a ticket's notes */
export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await noteService.getNotes(ticketId, token)
    } catch (error) {
        console.log(error);
    }
})

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state, action) => {
                state.notes = null
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload
            })
    }
})

export default noteSlice.reducer

