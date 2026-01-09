import { CiClock2, CiEdit } from "react-icons/ci";
import { useContext, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spinner, useDisclosure } from '@heroui/react'
import CreatePostDetails from "../CreatePostDetails/CreatePostDetails";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { deletePost } from "../../Services/allPostsServices";
import { toast } from "react-toastify";


export default function PostHeader({ post , getPosts }) {
  const {userData} = useContext(homeContext)
   const { isOpen, onOpen, onClose } = useDisclosure();
     const [isLoading, setIsLoading] = useState(false)

    async function deleteMyPost() {
    try {
      setIsLoading(true)
       const { data } = await deletePost(post._id)
      console.log(data);
      toast.success("Done! The post was deleted")
      getPosts()
      onClose()
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="card-title flex items-center justify-between">
        <div className="flex justify-start">
          <img
            src={post.user.photo}
            alt={post.user.name}
            className="size-20 object-cover rounded-full mx-3"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold capitalize">
              {post.user.name}
            </h1>
            <p className="text-sm flex items-center gap-1">
              <CiClock2 className="text-sm text-violet-500 inline-block" />
              <span>
                {new Date(post.createdAt).toLocaleString("en-us", {
                  timeStyle: "short",
                  dateStyle: "medium",
                })}
              </span>
            </p>
          </div>
        </div>
       { post.user._id === userData._id ? <Dropdown className="bg-blur">
        <DropdownTrigger>
            <HiDotsVertical className="text-2xl" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" variant="faded">
            <DropdownItem onPress={onOpen} key="edit" startContent={<CiEdit className="text-2xl"/>}>
              Edit Post
            </DropdownItem>
            <DropdownItem onClick={deleteMyPost} key="delete" className="text-danger" color="danger" startContent={<AiFillDelete className="text-2xl"/>} >
              {isLoading ? <Spinner color="secondary"/> : ""} Delete Post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>: ""}
        <CreatePostDetails post={post} osOpen={onOpen} isOpen={isOpen} getPosts={getPosts}/>
        
      </div>
     
    </>
  );
}
