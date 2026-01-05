import { CiClock2  , CiEdit } from 'react-icons/ci'
import { useContext } from "react";
import { homeContext } from "../../context/HomeContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";


export default function UserPostHeader( {post}) {
   const {userData} = useContext(homeContext)
  return<>
  {/* HEADER */}
        <div className="card-title flex items-center justify-between m-2">
          <div className="flex justify-start">
            <img  src={userData.photo} alt={userData.name} className="size-15 rounded-full mx-3 shadow shadow-violet-400" />
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold capitalize">{userData.name}</h1>
              <p className="text-sm flex items-center gap-1">
                <CiClock2 className="text-sm text-violet-500 inline-block" />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
          </div>
          { post.user._id === userData._id ?  
       <Dropdown className="bg-blur">
        <DropdownTrigger>
            <HiDotsVertical className="text-2xl" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" variant="faded">
            <DropdownItem  key="edit" startContent={<CiEdit className="text-2xl"/>}>
              Edit Post
            </DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger" startContent={<AiFillDelete className="text-2xl"/>} >
              Delete Post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> : ""}
       </div>
  </>
}
