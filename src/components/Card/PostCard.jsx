import { useEffect, useState } from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

export default function PostCard({ post }) {
  const [postComments, setPostComments] = useState([])
  useEffect(() => {
    setPostComments(post.comments)
  }, [postComments])
  
  return (
    <>
      <div className="card shadow-xl border border-gray-300 m-4 sm:m-4 p-3 sm:p-4 rounded-3xl">
        <PostHeader post={post} />
        <PostBody post={post}/>
        <PostFooter post={post}  postComments={postComments} setPostComments={setPostComments} />
      </div>
    </>
  );
}
