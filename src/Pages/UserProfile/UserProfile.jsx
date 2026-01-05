import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { Divider, Input } from "@heroui/react";
import Footer from "../../components/Footer/Footer";
import UserPostHeader from "./UserPostHeader";
import UsePostBody from "./UsePostBody";
import UserPostFooter from "./UserPostFooter";
import CreatePost from "../../components/CreatePost/CreatePost";
import { IoCamera } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { CiUser } from "react-icons/ci";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { getUserPosts } from "../../Services/userServices";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import UserPostCard from "./UserPostCard";


export default function UserProfile() {
  const { userData } = useContext(homeContext)
  const [ userPosts , setUserPosts] = useState([])
   const [isLoading, setIsLoading] = useState(false)
  const userId = userData?._id
  const info = [
    {
      icon:<MdDriveFileRenameOutline className="text-violet-900 text-2xl"/>,
      data:userData.name
    },
    {
      icon:<MdAlternateEmail className="text-violet-900 text-2xl"/>,
      data:userData.email
    },
    {
      icon:<HiOutlineIdentification className="text-violet-900 text-2xl"/>,
      data:"_id "+userData._id
    },
    {
    icon:<CiUser className="text-violet-900 text-2xl"/>,
    data:userData.gender
  },
  {
    icon:<LiaBirthdayCakeSolid className="text-violet-900 text-2xl"/>,
    data:userData.dateOfBirth
  }]
  async function getAllUserPosts(  ) {
    try {
      setIsLoading(true)
      const {data} = await getUserPosts(userId)
      setUserPosts(data.posts)
      console.log(data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
   if (userId) {
    getAllUserPosts()
  }
  }, [userId])
  

  
  return <>
 <div className="grid lg:grid-cols-8 grid-cols-4 min-h-screen bg-linear-to-bl from-gray-200 to-gray-400">
    {/* PROFILE HEADER */}
    <div className="lg:col-span-8 col-span-4 bg-blur p-6 m-5 flex justify-start items-center gap-1">
   <div className="relative">
    <img src={userData.photo} alt="user-image" className="size-30 rounded-full m-2 shadow shadow-violet-400"/>
   <IoCamera className="text-3xl text-gray-700 rounded-full  cursor-pointer hover:text-violet-900 bg-gray-50 p-1 absolute bottom-2 right-2" />
   </div>
   <div className="flex flex-col items-center p-1">
    <h2 className="font-semibold text-2xl text-violet-900 capitalize">{userData.name}</h2>
    <span>1,200 friends</span>
   </div>
    </div>
    {/* USER INFO */}
    <div className="lg:col-span-3 col-span-4 bg-blur p-5 space-y-4 m-5 self-start">
    <span className="mb-5 p-2 text-2xl ">Account information</span>
    <Divider/>
    {info.map((info) => <div className="flex items-center gap-4 "> 
    {info.icon}
    <span className="text-xl font-semibold">{info.data}</span>
  </div>)}
  <form>
   <div className="flex flex-col space-y-4">
    <span className="text-2xl p-1 m-1">Update your information</span>
    <Divider/>
    <Input  className="text-2xl" type="password" placeholder="Enter your password"endContent={ <TbLockPassword />}/>
    <Input className="text-2xl" type="text" placeholder="Enter new password" endContent={ <TbLockPassword />}/>
   </div>
  </form>
    </div>
   {/* USER POSTS */}
    <div className="lg:col-span-5 col-span-4 bg-blur m-5 p-5">
    <CreatePost/>
      { isLoading ? [...Array(3)].map( ()=> <PostSkeleton />)  : <>
      { userPosts && <>
      {userPosts.map( (post)=>{ return <>
      <UserPostCard post={post}/>
      </> })}
      </>}
     </>}

    </div>

</div>

<Footer/>

  </>
}


