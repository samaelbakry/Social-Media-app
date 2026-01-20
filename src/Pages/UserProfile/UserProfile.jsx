import Footer from "../../components/Footer/Footer";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useContext, useEffect, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { getUserPosts } from "../../Services/userServices";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import UserPostCard from "./UserPostCard";
import UserInfo from "./UserInfo";
import ProfileHeader from "./ProfileHeader";
import { MdPhotoCameraBack } from "react-icons/md";
import { Divider } from "@heroui/react";



export default function UserProfile() {
  const { userData } = useContext(homeContext)
  const [ userPosts , setUserPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const userId = userData?._id

  async function getAllUserPosts(  ) {
    try {
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
      <title>Profile</title>
 <div className="grid lg:grid-cols-8 grid-cols-4 md:p-10 p-1 bg-gray-200">
    {/* PROFILE HEADER */}
    <ProfileHeader/>
    {/* PROFILE INFO */}
     <UserInfo/>
    {/* USER POSTS */}
    <div className="lg:col-span-5 col-span-4 bg-blur md:m-5 p-1 m-4  lg:p-5">
    <CreatePost/>
     <span className="text-gray-500 font-semibold p-2 md:m-3 text-medium md:text-2xl">Posts</span>
       <Divider className="mb-2"/>
    { userPosts.length === 0 && isLoading === false &&<>
    <div className="flex justify-center flex-wrap items-center gap-1 md:m-10 m-2 bg-blur md:h-50 h-30">
      <MdPhotoCameraBack className="md:text-2xl text-medium text-gray-400" />
      <span className="font-semibold md:text-2xl text-medium text-gray-400">Your feed is empty! Add your first post</span>
    </div>
    </>}
      { isLoading ? [...Array(3)].map( ()=> <PostSkeleton />)  : <>
      { userPosts && <>
      {userPosts.map( (post)=>{ return <>
      <UserPostCard userPosts={userPosts} getAllUserPosts={getAllUserPosts} post={post}/>
      </> })}
      </>}
     </>}
    </div>

</div>

<Footer/>

  </>
}


