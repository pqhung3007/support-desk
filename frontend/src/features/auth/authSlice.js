import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

/* Get user from local storage */
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    /* save user in localStorage to the state if there's any*/
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

/* manage asynchronous request life cycles */
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        /* taken from backend */
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        /* action is rejected and error msg is printed */
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        /* taken from backend */
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        /* action is rejected and error msg is printed */
        return thunkAPI.rejectWithValue(message)
    }
    console.log(user);
})

export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
    return await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    /* hook into status: pending, fulfill */
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                /* message from rejectWithValue will be parsed into payload */
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.user = null
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer