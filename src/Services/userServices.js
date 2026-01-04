import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL


export async function getUserData() {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile-data` , {
            headers:{
                token:localStorage.getItem("token")
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}