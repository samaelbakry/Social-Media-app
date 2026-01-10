import {Divider, Skeleton} from "@heroui/react";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoCamera } from 'react-icons/io5'
import { homeContext } from '../../context/HomeContext'
import { changeUserPhoto } from '../../Services/userServices'
import { toast } from 'react-toastify'
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

export default function ProfileHeader() {
const { userData } = useContext(homeContext)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadUserPhoto, setUploadUserPhoto] = useState()
  const uploadPhoto = useRef()

  function clickUpload(){
    uploadPhoto.current.click()
  }
  function choosePhoto(){
    const file = uploadPhoto.current.files[0]
    setUploadUserPhoto(file)
  }
 async function getUserPhoto(){
     const formData= new FormData()
     formData.append("photo",uploadUserPhoto)
     setIsLoading(true)
     try {
        const { data } = await changeUserPhoto(formData)
        console.log(data);
        userData.name(uploadUserPhoto)
        
     } catch (error) {
        console.log(error);
     }finally{
        setIsLoading(false)
        toast.success("Done! Your picture is uploaded")
     }
  }

  useEffect(() => {
    if(uploadUserPhoto){
        getUserPhoto()
    }
  }, [uploadUserPhoto])
  

  return <>
  <div className="lg:col-span-8 col-span-4 bg-blur p-6 m-5 flex flex-wrap justify-between items-center md:gap-1 gap-5">
     <div className="flex items-center gap-3">
   <div className="relative">
    {isLoading ? <Skeleton className="rounded-full size-30" /> :
     <img src={uploadUserPhoto ? URL.createObjectURL(uploadUserPhoto) : 
     userData.photo} alt="userImage" className="size-30 object-cover rounded-full m-2 shadow shadow-violet-400"/>  }
     <IoCamera onClick={clickUpload} className="text-3xl text-gray-700 rounded-full  cursor-pointer hover:text-violet-900 bg-gray-50 p-1 absolute bottom-2 right-2" />
     <input onChange={choosePhoto} type="file" ref={uploadPhoto} className='hidden'/>
     </div>
    
     <div className="flex flex-col items-center p-1">
      <h2 className="font-semibold text-4xl text-violet-900 capitalize">{userData.name}</h2>
      <span>1,200 friends</span>
     </div>
     </div>
     
     <div className="flex flex-wrap  items-center gap-3 p-1">
      <span className="font-semibold text-md text-gray-700 shadow capitalize bg-gray-300 p-3 rounded-2xl flex items-center gap-2 cursor-pointer">
         <CiEdit className="text-xl text-violet-800"/>
         edit profile</span>
      <span className="font-semibold text-md text-gray-700 shadow capitalize bg-gray-300 p-3 rounded-2xl flex items-center gap-2 cursor-pointer">
         <CiCirclePlus className="text-xl text-violet-800" />
         upload story</span>
     </div>
   
    
  </div>
   
  </>
}

