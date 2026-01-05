import { useContext } from "react";
import CreatePostDetails from "../CreatePostDetails/CreatePostDetails";
import { homeContext } from "../../context/HomeContext";

export default function CreatePost( { getPosts }) {
    const {userData} = useContext(homeContext)
  return (
    <>
      <div className="p-2 bg-white rounded-2xl m-2 flex justify-between items-center">
        <h3 className="text-lg text-gray-600 p-4">
         Hey {userData.name}, How’s life treating you today 😄
        </h3>
        <CreatePostDetails  getPosts={ getPosts }/>
      </div>
    </>
  );
}
