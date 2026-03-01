import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function registerForm(formData) {
    const data = await axios.post(`${API_BASE_URL}/users/signup` , formData ,{
        headers:{
            "Content-Type": "application/json"
        }
    })
    return data
}

export async function loginForm(formData) {
    const data = await axios.post(`${API_BASE_URL}/users/signin` , formData)
    return data
}