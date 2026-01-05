import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL


export async function getUserData() { //get user data
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
export async function getUserPosts(userPostId) { //get user posts
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userPostId}/posts` , {
            headers:{
                token:localStorage.getItem("token")
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}