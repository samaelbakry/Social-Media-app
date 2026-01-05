import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllPosts() {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts?limit=50` , {
            headers:{
                token:localStorage.getItem("token")
            },
             params:{
                sort:"-createdAt",
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function getPostsId(postId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}` , {
            headers:{
                token:localStorage.getItem("token")
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function createPost(formData) {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts` , formData , {
            headers:{
                token:localStorage.getItem("token")
            } , 
           
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}