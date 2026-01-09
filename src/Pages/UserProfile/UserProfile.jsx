import Footer from "../../components/Footer/Footer";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useContext, useEffect, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { getUserPosts } from "../../Services/userServices";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import UserPostCard from "./UserPostCard";
import UserInfo from "./UserInfo";
import ProfileHeader from "./ProfileHeader";


export default function UserProfile() {
  const { userData } = useContext(homeContext)
  const [ userPosts , setUserPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const userId = userData?._id

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
    <ProfileHeader/>
    {/* PROFILE INFO */}
     <UserInfo/>
    {/* USER POSTS */}
    <div className="lg:col-span-5 col-span-4 bg-blur m-5 p-5">
    <CreatePost/>
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


