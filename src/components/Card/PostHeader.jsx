import { CiClock2, CiEdit } from "react-icons/ci";
import { useContext } from "react";
import { homeContext } from "../../context/HomeContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@heroui/react'
import CreatePostDetails from "../CreatePostDetails/CreatePostDetails";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";


export default function PostHeader({ post }) {
  const {userData} = useContext(homeContext)
   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="card-title flex items-center justify-between">
        <div className="flex justify-start">
          <img
            src={post.user.photo}
            alt={post.user.name}
            className="size-12 rounded-full mx-3"
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
       { post.user._id === userData._id ?  
       <Dropdown className="bg-blur">
        <DropdownTrigger>
            <HiDotsVertical className="text-2xl" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" variant="faded">
            <DropdownItem onPress={onOpen} key="edit" startContent={<CiEdit className="text-2xl"/>}>
              Edit Post
            </DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger" startContent={<AiFillDelete className="text-2xl"/>} >
              Delete Post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> : ""}
         {/* <CreatePostDetails isOpen={isOpen} onOpen={onOpen} onClose={onClose}/> */}
      </div>
     
    </>
  );
}
