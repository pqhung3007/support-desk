import axios from 'axios'

//? fetch from backend http: http://localhost:5050/api/users
//? set in package.json's proxy
const REGISTER_URL = '/api/users'
const LOGIN_URL = '/api/users/login'

const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => localStorage.removeItem('user')

const login = async (userData) => {
    const response = await axios.post(LOGIN_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    register,
    logout,
    login,
}

/* export all defined function */
export default authService