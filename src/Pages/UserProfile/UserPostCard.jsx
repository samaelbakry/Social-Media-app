import React from 'react'
import UserPostHeader from './UserPostHeader'
import UsePostBody from './UsePostBody'
import UserPostFooter from './UserPostFooter'

export default function UserPostCard({post}) {
  return <>
    <div className='shadow bg-gray-200 border border-gray-200 m-6 sm:m-4 p-3 sm:p-4  rounded-3xl'>
     <UserPostHeader post={post}/>
      <UsePostBody post={post} />
      <UserPostFooter post={post}/>
    </div>
  </>
}
