import axios from "axios"

const API = axios.create({
  baseURL: "https://smart-hospital-management-system-bqw6.onrender.com/api"
})

export default API