import React from "react";
import { BiSolidVideos } from "react-icons/bi";
import { MdOutlineBookmarks } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaUsers, FaStore, FaUserFriends, FaUserAlt } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

export default function FirstSideBar() {
  const sidebarItems = [
    {
      icon: (
        <Link to={"/userprofile"}>
          {" "}
          <FaUserAlt className="text-2xl  text-violet-900 cursor-pointer" />{" "}
        </Link>
      ),
      title: (
        <Link to={"/userprofile"}>
          <span className="text-xl cursor-pointer">Your Profile </span>{" "}
        </Link>
      ),
    },
    {
      icon: (
        <FaUserFriends className="text-2xl  text-violet-900 cursor-pointer" />
      ),
      title: "Friends",
    },
    {
      icon: <FaStore className="text-2xl  text-violet-900 cursor-pointer" />,
      title: "Marketplace",
    },
    {
      icon: <FaUsers className="text-2xl  text-violet-900 cursor-pointer" />,
      title: "Groups",
    },
    {
      icon: (
        <BiSolidVideos className="text-2xl  text-violet-900 cursor-pointer" />
      ),
      title: "Watch",
    },
    {
      icon: (
        <MdOutlineBookmarks className="text-2xl  text-violet-900 cursor-pointer" />
      ),
      title: "Saved",
    },
    {
      icon: (
        <IoIosArrowDropdown className="text-2xl  text-violet-900 cursor-pointer" />
      ),
      title: "See more",
    },
  ];
  return (
    <>
      <Link to={"/home"}>
        <logo className="flex items-center m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 text-violet-900 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h1 className="font-bold text-4xl text-violet-900">ECHO</h1>
        </logo>
      </Link>
      {/* side items mapping */}
      <div className="flex flex-col items-start m-6 p-6 space-y-4">
        {sidebarItems.map((item, index) => (
          <div
            className="flex items-center justify-center gap-4 duration-500 hover:bg-gray-200 hover:shadow px-3 rounded-xl"
            key={index}
          >
            {item.icon}
            <span className="text-xl cursor-pointer">{item.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}
