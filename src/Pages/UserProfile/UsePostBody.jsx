import React from 'react'

export default function UsePostBody({post}) {
  return <>
   {/* BODY */}
        <div className="card-body min-h-30 p-10 m-5 flex flex-col gap-4 items-center justify-center border border-gray-300 rounded-xl ">
          <span>{ post?.body}</span>
       {post.image && <img src={post?.image} alt="post-image" className='h-90 object-cover rounded-2xl w-full' />}
        </div>
  </>
}
