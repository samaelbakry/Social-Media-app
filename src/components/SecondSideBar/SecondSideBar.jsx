import React from 'react'
import {IoLogoInstagram } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";

export default function SecondSideBar() {
    const secondSidebarItems = [
  { icon:  <FaXTwitter />, 
    title:"Social media app",
    add: <button className='text-md rounded-lg px-2 outline-2 outline-blue-500 outline-offset-4 cursor-pointer hover:bg-blue-500 hover:text-white hover:outline-offset-0 duration-500'>
      <MdDownloadDone className='inline-block mx-1' />follow
      </button>
   },
   { icon: <IoLogoInstagram /> , 
    title:"Social media app",
    add:<button className='text-md rounded-lg px-2 outline-2 outline-blue-500 outline-offset-4 cursor-pointer hover:bg-blue-500 hover:text-white hover:outline-offset-0 duration-500'>
      <MdDownloadDone className='inline-block mx-1'/>follow
      </button>
   },
    { icon: <FaApple />, 
    title:"Technology Company",
    add:<button className='text-md rounded-lg px-2 outline-2 outline-blue-500 outline-offset-4 cursor-pointer hover:bg-blue-500 hover:text-white hover:outline-offset-0 duration-500'>
      <MdDownloadDone className='inline-block mx-1' />follow
      </button>
   }
  ]

  return <>
   <h4 className="m-4 text-violet-900 text-semibold text-lg p-1">Popular pages and companies</h4>
              <div className="flex flex-col items-start space-x-5 space-y-5">
                 {secondSidebarItems.map((item ,index) =>(
                   <div className="flex items-center justify-center gap-4" key={index}>
                    {item.icon} 
                    <span>{item.title}</span>
                    {item.add}
                </div>
                 ))}
               
              </div>
  </>
}
