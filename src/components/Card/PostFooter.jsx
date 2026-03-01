import { BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { IoIosSend } from "react-icons/io";
import userImage from "../../assets/userImage2.jpg";
import { CiCircleChevDown, CiEdit } from "react-icons/ci";
import PostDetails from "../PostDetails/PostDetails";
import { Button,Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, useDisclosure,} from "@heroui/react";
import {createComment, deleteComment,getPostComments,updateComment,} from "../../Services/comments";
import { useContext, useEffect, useRef, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { TiAttachment } from "react-icons/ti";
import { ImAttachment } from "react-icons/im";
import { toast } from "react-toastify";

// // setIsLoading(true);
    // try {
    //   const { data } = await createComment(comment);
    //   setPostComments(data.comments);
    //   setCommentMsg("");
    //   getNewComments()
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }


export default function PostFooter({ post, postComments, setPostComments }) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentMsg, setCommentMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCommentImage, setSelectedCommentImage] = useState("")
  const attachFile = useRef()


  function openFile(){
    attachFile.current.click()
  }
  function chooseFile(){
    const file = attachFile.current.files[0]
    setSelectedCommentImage(file)
  }

  async function sendComment(data) { // sending comment
   
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

  function getComment(e) {
    setCommentMsg(e.target.value);
  }


  return (
    <>
      <div className="card-footer mx-auto">
        {/* REACTIONS */}
        <div className="reactions flex md:justify-between items-center justify-center gap-5 md:p-3 ">
          <div className="icon-wrap flex items-center gap-1">
            {post.likesCount}
            <BiLike className="md:text-2xl text-blue-400" />
          </div>
          <div className="comments flex items-center gap-1">
            {post.commentsCount}
            <FaComment className="md:text-xl text-gray-800 mx-2" />  
             {post.commentsCount >= 2 && <>
              <button
                  onClick={onOpen}
                  className="mx-3 text-gray-800 md:text-lg text-xs font-semibold  cursor-pointer">
                  view all comments
                  <CiCircleChevDown className="md:inline-block mx-1 md:text-xl hidden" />
                </button>
              <PostDetails
              postId={post._id}
              post={post}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              setPostComments={setPostComments}
              postComments={postComments}
            />
         </>}   
          </div>
        
        </div>
        {/* COMMENT INPUT */}
        <div className="flex items-center justify-center md:gap-4 gap-2 md:m-2 p-3">
          <input
            value={commentMsg}
            onChange={(e) => getComment(e)}
            type="text"
            placeholder=" Add comment...."
            className="bg-gray-200/60 rounded-xl w-fit md:w-full p-2 placeholder:text-gray-700"
          />
           <Input ref={attachFile} accept="image/png,image/jpeg,image/jpg" onChange={chooseFile} className="hidden" type="file"/>
          <ImAttachment onClick={openFile}  className="text-2xl text-violet-900 cursor-pointer"/>

          <Button disabled={!commentMsg && !selectedCommentImage} isLoading={isLoading}
            onPress={() => {sendComment({
                  content: commentMsg,
                  image:selectedCommentImage,
                });
            }}
            className="cursor-pointer bg-violet-600 shadow-2xl rounded-3xl disabled:bg-gray-200 disabled:shadow-violet-500 disabled:shadow disabled:cursor-not-allowed">
            <IoIosSend className="md:text-3xl text-lg text-gray-300 " />
          </Button>
          
        </div>
        {/* COMMENT DATA */}

        {post.topComment && <>
         <div className="gap-2 flex justify-between items-center bg-gray-200/60  m-3 md:m-1 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <img
                  src={
                    post.topComment.commentCreator.photo.includes("/undefined")
                      ? userImage
                      : post.topComment.commentCreator.photo
                  }
                  alt={post.topComment.commentCreator.name}
                  className=" border border-violet-900 outline-offset-4 md:m-2 rounded-full md:size-10 size-6"
                />
                <div className="flex flex-col md:gap-1">
                  <span className="font-bold text-sm md:text-md capitalize text-gray-800">
                    {post.topComment.commentCreator.name}
                  </span>
                  <p className="w-full rounded-lg text-sm md:text-md text-gray-800">
                    {post.topComment.content}
                  </p>
                </div>
              </div>
              </div>
              
        </>}
      </div>
    </>
  );
}
