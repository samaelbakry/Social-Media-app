import { useContext } from "react";
import CreatePostDetails from "../CreatePostDetails/CreatePostDetails";
import { homeContext } from "../../context/HomeContext";
import { Button, useDisclosure } from "@heroui/react";
import { IoCreateOutline } from "react-icons/io5";

export default function CreatePost( { getPosts }) {
    const {userData} = useContext(homeContext)
    const { isOpen, onOpen, onClose , onOpenChange } = useDisclosure();

  return (
    <>
      <div className="p-2 bg-white/70 rounded-2xl md:m-2 m-1 flex md:justify-between justify-center items-center">
        <h3 className="md:text-lg text-gray-600 md:p-4 p-1 text-xs">
         Hey {userData.name}, How’s life treating you today 😄
        </h3>
         <div className="flex flex-wrap gap-3">
        <Button className="bg-gray-100 md:m-2" onPress={onOpen}>
          <span className="md:text-md text-sm font-bold text-violet-900 md:p-4 cursor-pointer ">
            Create post
            <IoCreateOutline className="inline-block mx-2" />
          </span>
        </Button>
      </div>
        <CreatePostDetails isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}  getPosts={ getPosts }/>
      </div>
    </>
  );
}
