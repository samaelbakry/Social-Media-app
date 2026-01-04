import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function createComment(comment) {
    const data = await axios.post(`${API_BASE_URL}/comments` , comment ,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
    return data
}