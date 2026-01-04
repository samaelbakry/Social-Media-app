import { CiClock2, CiEdit } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

export default function PostHeader({ post }) {
  return (
    <>
      <div className="card-title flex items-center justify-between">
        <div className="flex justify-start">
          <img
            src={post.user.photo}
            alt={post.user.name}
            className="size-12 rounded-full mx-3"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold capitalize">
              {post.user.name}
            </h1>
            <p className="text-sm flex items-center gap-1">
              <CiClock2 className="text-sm text-violet-500 inline-block" />
              <span>
                {new Date(post.createdAt).toLocaleString("en-us", {
                  timeStyle: "short",
                  dateStyle: "medium",
                })}
              </span>
            </p>
          </div>
        </div>
        <Dropdown className="bg-blur font-bold ">
          <DropdownTrigger>
            <HiDotsVertical className="text-2xl" />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" variant="faded">
            <DropdownItem key="edit" startContent={<CiEdit className="text-2xl"/>}>
              Edit Post
            </DropdownItem>

            <DropdownItem key="delete" className="text-danger" color="danger" startContent={<AiFillDelete className="text-2xl"/>} >
              Delete Post
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}
