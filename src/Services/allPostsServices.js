import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL

export async function getAllPosts() { // all posts for NewsFeed
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

export async function getPostsId(postId) { // get single post for postDetails
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

export async function createPost(formData) {// sending data for create post
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

export async function updatePost(postId ,formData) { // update post data
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${postId}` , formData , {
            headers:{
                token:localStorage.getItem("token")
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
                token:localStorage.getItem("token")
            } , 
           
        } )
        return response
        
    } catch (error) {
        console.log(error);
        
    }
}