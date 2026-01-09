import { useContext } from "react";
import CreatePostDetails from "../CreatePostDetails/CreatePostDetails";
import { homeContext } from "../../context/HomeContext";
import { Button, useDisclosure } from "@heroui/react";
import { IoCreateOutline } from "react-icons/io5";

export default function CreatePost( { getPosts }) {
    const {userData} = useContext(homeContext)
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="p-2 bg-white rounded-2xl m-2 flex justify-between items-center">
        <h3 className="text-lg text-gray-600 p-4">
         Hey {userData.name}, How’s life treating you today 😄
        </h3>
         <div className="flex flex-wrap gap-3">
        <Button className="bg-gray-100 p-1 m-2" onPress={onOpen}>
          <span className="text-md font-bold text-violet-900 p-4 cursor-pointer ">
            Create post
            <IoCreateOutline className="inline-block mx-2" />
          </span>
        </Button>
      </div>
        <CreatePostDetails isOpen={isOpen} onClose={onClose}  getPosts={ getPosts }/>
      </div>
    </>
  );
}
