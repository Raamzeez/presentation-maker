import axios from 'axios'

const axiosInstance = axios.create({
    "baseURL": "http://localhost:5000/api",
    validateStatus: (s) => s <= 500
})


export default axiosInstance