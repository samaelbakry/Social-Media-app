import React from 'react'

export default function UsePostBody({post}) {
  return <>
   {/* BODY */}
        <div className="card-body min-h-30 p-2 md:p-10 md:m-5 m-2 flex flex-col gap-4 items-center justify-center border border-gray-300 rounded-xl ">
          <span>{ post?.body}</span>
       {post.image && <img src={post?.image} alt="post-image" className='md:h-90 h-60 object-cover rounded-2xl w-full' />}
        </div>
  </>
}
