import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Skeleton,
} from "@heroui/react";
import userImage from "../../assets/userImage2.jpg";
import { IoIosSend } from "react-icons/io";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createComment, deleteComment, getPostComments, updateComment } from "../../Services/comments";
import { homeContext } from "../../context/HomeContext";
import { HiDotsVertical } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { ImAttachment } from "react-icons/im";

export default function Comments({ post }) {

  const [commentMsg, setCommentMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(homeContext);
  const [editingCommentId, setEditingCommentId] = useState("")
  const [allComments, setAllComments] = useState([])
  const [selectedCommentImage, setSelectedCommentImage] = useState("")
  const attachFile = useRef()

  function openFile(){
    attachFile.current.click()
  }
  function chooseFile(){
    const file = attachFile.current.files[0]
    setSelectedCommentImage(file)
  }

  async function sendComment(data) { 
   
    const formData= new FormData()
    if(commentMsg){
      formData.append("content",commentMsg)
    }
    if(selectedCommentImage){
      formData.append("image",selectedCommentImage)
    }
    setIsLoading(true)
    try {
       const response = await createComment(post._id ,formData)
       console.log(response);
       setCommentMsg("")
       getNewComments()
      toast.success('Done! your comment is added')

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }

  }

  async function deleteMyComment(postId,commentId) { 
    setIsLoading(true);
    try {
      const { data } = await deleteComment(postId,commentId);
      console.log(data);
      toast.success("comment deleted successfully")
      getComments(postId)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function getComment(e) { 
    setCommentMsg(e.target.value);
  }

  async function updateMyComment( postId, commentId, content) { 
    try {
      const { data } = await updateComment( postId, commentId, { content });
      console.log(data);
      
      setCommentMsg("");
      setEditingCommentId("");
      getComments(postId)
    } catch (error) {
      console.log(error);
    } 
  }

async function getComments(postId) { 
  setIsLoading(true)
  try {
    const data = await getPostComments(postId);    
    setAllComments(data?.data?.data.comments || [])
    console.log(data?.data?.data.comments);
    
  } catch (error) {
    console.log(error);
  }finally{
    setIsLoading(false)
  }
}

useEffect(() => {
if (!post?._id) return;
 getComments(post._id)
}, [post._id])



  return (
    <>
       <div className=" flex items-center justify-center gap-4 m-2 p-3">
        <input
          value={commentMsg}
          onChange={(e) => getComment(e)}
          type="text"
          placeholder=" Add comment...."
          className="bg-gray-200/60 rounded-xl w-full p-2 placeholder:text-gray-700"
        />
         <Input ref={attachFile} accept="image/png,image/jpeg,image/jpg" onChange={chooseFile} className="hidden" type="file"/>
        <ImAttachment onClick={openFile} className="text-2xl text-violet-900 cursor-pointer"/>
        <Button disabled={!commentMsg && !selectedCommentImage} isLoading={isLoading}
            onPress={() => {
              if (editingCommentId) {
                updateMyComment(post._id ,editingCommentId, commentMsg );
              } else {
                sendComment({
                  content: commentMsg,
                  image:selectedCommentImage,
                });
              }
            }}
            className="cursor-pointer bg-violet-600 shadow-2xl rounded-3xl disabled:bg-gray-200 disabled:shadow-violet-500 disabled:shadow disabled:cursor-not-allowed">
            <IoIosSend className="md:text-3xl text-lg text-gray-300 " />
          </Button>
      </div> 
      {isLoading ? <>
      <p className="text-center text-base">Loading....</p>
      </>
     : <>
      { allComments.map((comment)=>(
        <React.Fragment key={comment._id}>
        <div className="flex items-center justify-between flex-wrap space-y-3 gap-2 bg-gray-100 rounded-2xl p-2 text-gray-500">
          <div className="flex gap-3 items-center">
            <img src={comment.commentCreator.photo} alt={comment?.commentCreator?.name} className="size-8 rounded-2xl border border-violet-900 outline-offset-4" />
            <div className="flex flex-col flex-wrap">
            <span>{comment?.commentCreator?.name}</span>
            <span>{comment?.content}</span>
           </div>
          </div>
          <div className="p-3">
            { (comment?.commentCreator?._id === userData?._id || userData?._id===post.user._id) && <> 
              <Dropdown className="bg-blur font-bold ">
                   <DropdownTrigger>
                     <HiDotsVertical className="text-2xl" />
                   </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions" variant="faded">
                    <DropdownItem
                      key="edit"
                      onPress={() => {setCommentMsg(comment.content); setEditingCommentId(comment._id);}}
                      startContent={<CiEdit className="text-2xl" />}>
                      Edit comment
                     </DropdownItem>
                    <DropdownItem
                    onPress={()=>{deleteMyComment(post._id , comment.commentCreator._id)}}
                    key="delete"
                    className="text-danger"
                    color="danger"
                     startContent={<AiFillDelete className="text-2xl" />}>
                     Delete comment
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </> }
          </div>
           
        </div>
        
        </React.Fragment>
      )) }
      </>}
    </>
  );
}



