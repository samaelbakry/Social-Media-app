import { useContext, useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import PostCard from "../../components/Card/PostCard";
import FirstSideBar from "../../components/FirstSideBar/FirstSideBar";
import SecondSideBar from "../../components/SecondSideBar/SecondSideBar";
import ThirdSideBar from "../../components/ThirdSideBar/ThirdSideBar";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import Stories from "../../components/Stories/Stories";
import CreatePost from "../../components/CreatePost/CreatePost";
import { homeContext } from "../../context/HomeContext";
import { getAllPosts } from "../../Services/allPostsServices";

export default function NewsFeed() {
 
   const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([]);

  async function getPosts() { //all posts
    try {
      setIsLoading(true)
      const { data } = await getAllPosts();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }
  }
    useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <main className="">
        <div className="grid grid-cols-8 shadow p-5  bg-gray-100  gap-4">
          {/* first column  */}
          <div className=" hidden lg:block col-span-2">
            <div className="bg-blur">
              <FirstSideBar />
            </div>
            <div className="bg-blur mt-4 p-5">
              <SecondSideBar />
            </div>
          </div>
          {/* middle column + posts */}
          <div className="lg:col-span-4 col-span-8">
            <div className="bg-blur ">
            <CreatePost getPosts={getPosts}/>
             <Stories/>
              { isLoading ? [...Array(5)].map( ()=> <PostSkeleton />) : <>
              {posts &&
                posts.map((post) => { return ( <PostCard getPosts={getPosts} key={post._id} post ={post} />
                  );
                })}
              </>}
            </div>
          </div>
          {/* last column  */}
          <div className="hidden lg:block col-span-2 bg-blur p-2 self-start">
            <ThirdSideBar />
          </div>
        </div>
      </main>
    </>
  );
}
