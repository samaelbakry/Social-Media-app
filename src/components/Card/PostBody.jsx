import { image } from '@heroui/react'
import React from 'react'

export default function PostBody({post , postDetails}) {
  return <>
   {/* CARD BODY */}
        <div className="card-body p-2 my-4 flex flex-col gap-4">
          <span>{post.body}</span>
          {post.image && <img src={post.image} alt={post.image} className={`rounded-xl object-cover w-fill ${ postDetails ? "" : "h-80"}`} />}
        </div>
  </>
}
