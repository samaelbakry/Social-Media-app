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

export async function deleteComment(commentId) {
    const data = await axios.delete(`${API_BASE_URL}/comments/${commentId}`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
    return data
}

export async function getPostComments(postId) {
    const data = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`,{
            headers:{
                token:localStorage.getItem("token")
            }
        })
    return data
}
export async function updateComment(commentId , content) {
    const data = await axios.put(`${API_BASE_URL}/comments/${commentId}`, content, {
            headers:{
                token:localStorage.getItem("token")
            }
        })
    return data
}