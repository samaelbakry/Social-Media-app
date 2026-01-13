import { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

export default function PostCard({ post , getPosts }) {
  const [postComments, setPostComments] = useState([])
  useEffect(() => {
    setPostComments(post.comments)
  }, [postComments])
  
  return (
    <>
      <div className="card md:shadow-xl border border-gray-300 md:m-4 m-6 sm:p-5 rounded-3xl">
        <PostHeader getPosts={getPosts} post={post} />
        <PostBody post={post}/>
        <PostFooter getPosts={getPosts} post={post}  postComments={postComments} setPostComments={setPostComments} />
      </div>
    </>
  );
}
