import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem("token")

export async function getUserData() { //get user data
    try {
        const response = await axios.get(`${API_BASE_URL}/users/profile-data` , {
            headers:{
                 Authorization:`Bearer ${token}`
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
    }
}

export async function getUserPosts() { //get user posts
    try {
        const response = await axios.get(`${API_BASE_URL}/users/posts` , {
            headers:{
                Authorization:`Bearer ${token}`
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}


export async function changeUserPassword(formObj) { //update password
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/change-password` , formObj , {
            headers:{
                Authorization:`Bearer ${token}`
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function changeUserPhoto(formData) { //change user profile picture
    try {
        const response = await axios.put(`${API_BASE_URL}/users/upload-photo` , formData, {
             headers:{
                Authorization:`Bearer ${token}`
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}