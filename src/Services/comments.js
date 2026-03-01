import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URL
const token = localStorage.getItem("token")

export async function createComment(postId,formData) {
    const data = await axios.post(`${API_BASE_URL}/posts/${postId}/comments` , formData,{
            headers:{
                 Authorization:`Bearer ${token}`
            }
        })
    return data

}

export async function deleteComment(postId , commentId) {
    const data = await axios.delete(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    return data
}

export async function getPostComments(postId) {
    const data = await axios.get(`${API_BASE_URL}/posts/${postId}/comments?page=1&limit=10`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    return data
}

export async function updateComment( postId,commentId , content) {
    const data = await axios.put(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, content, {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    return data
}