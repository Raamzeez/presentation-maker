import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    validateStatus: s => s <= 500,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
})


export default axiosInstance