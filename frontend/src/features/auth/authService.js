import axios from 'axios'

//? fetch from backend http: http://localhost:5050/api/users
//? set in package.json's proxy
const API_URL = '/api/users'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    register
}

/* export all defined function */
export default authService