import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem("token")

export async function getAllPosts() { // all posts for NewsFeed
    try {
        const response = await axios.get(`${API_BASE_URL}/posts` , {
            headers:{
                Authorization:`Bearer ${token}`
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

export async function getPostId(id) { // get single post for postDetails
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}` , {
            headers:{
                  Authorization:`Bearer ${token}`
            }
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function createPost(formData) {// sending data for create post
    try {
        const response = await axios.post(`${API_BASE_URL}/posts` , formData , {
            headers:{
                Authorization:`Bearer ${token}`
            } , 
           
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function updatePost(postId,formData) { // update post data
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${postId}` , formData , {
            headers:{
                Authorization:`Bearer ${token}`
            } , 
           
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}

export async function deletePost(postId) { // delete post data
    try {
        const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
            headers:{
                 Authorization:`Bearer ${token}`
            } , 
           
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}