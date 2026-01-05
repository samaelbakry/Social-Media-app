import { FcLike } from "react-icons/fc";
import { BiLike } from "react-icons/bi";
import { FaComment, FaRegFaceLaughSquint } from "react-icons/fa6";
import { useContext, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { Button, Dropdown,DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure,} from "@heroui/react";
import { IoIosSend } from "react-icons/io";
import userImage from "../../assets/userImage2.jpg";
import { createComment } from "../../Services/comments";
import { CiCircleChevDown, CiEdit } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
import PostDetails from "../../components/PostDetails/PostDetails";
import { AiFillDelete } from "react-icons/ai";


export default function UserPostFooter({ post }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentMsg, setCommentMsg] = useState("");
  const [postComments, setPostComments] = useState([]);
  const { userData } = useContext(homeContext);
  const [isLoading, setIsLoading] = useState(false);



  async function sendComment(comment) {
    setIsLoading(true);
    try {
      const { data } = await createComment(comment);
      setPostComments(data.comments);
      setCommentMsg("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  function getComment(e) {
    setCommentMsg(e.target.value);
  }
 
  return (
    <>
      {/* FOOTER */}
      {/* REACTIONS */}
      <div className="reactions flex justify-between">
        <div className="icon-wrap flex items-center">
          <FcLike className="text-2xl" />
          <BiLike className="text-2xl text-blue-400" />
          <FaRegFaceLaughSquint className="text-2xl text-amber-300" />
          <span className="text-md mx-2 text-gray-800 font-bold">
            Reactions
          </span>
        </div>
        <div className="comments flex items-center">
          <FaComment className="text-xl text-gray-800 mx-2" />
          <span className="text-md text-gray-800 font-bold">
            {post.comments.length} Comment
          </span>
        </div>
        {/* COMMENT INPUT */}
      </div>
      {/* COMMENT INPUT */}
      <div className=" flex items-center shadow rounded-2xl justify-center gap-4 m-8 p-3">
        <input
          value={commentMsg}
          onChange={(e) => getComment(e)}
          type="text"
          placeholder=" Add comment...."
          className="bg-gray-200/60 rounded-xl w-full p-2 placeholder:text-gray-700"
        />
        <Button
          disabled={commentMsg ? false : true}
          onPress={() =>
            sendComment({
              content: commentMsg,
              post: post._id,
            })
          }
          isLoading={isLoading}
          className="cursor-pointer bg-violet-600 shadow-xl outline-2 outline-violet-300 outline-offset-2 rounded-3xl disabled:bg-transparent disabled:shadow-violet-500 disabled:shadow disabled:cursor-not-allowed disabled:outline-0"
        >
          <IoIosSend className="text-3xl text-gray-400" />
        </Button>
      </div>

      {/* COMMENT DATA */}
      {postComments.length !==0 && (
        <>
          <div className=" gap-2 flex justify-between items-center bg-gray-200/60 p-2 rounded-2xl">
            <div className="flex items-center gap-2">
              <img
                src={
                  postComments[0].commentCreator.photo.includes("/undefined")
                    ? userImage
                    : postComments[0].commentCreator.photo
                }
                alt={postComments[0].commentCreator.name}
                className=" border border-violet-900 outline-offset-4 m-2 rounded-full size-10"
              />
              <div className="flex flex-col gap-1">
                <span className="font-bold capitalize text-gray-800">
                  {postComments[0].commentCreator.name}
                </span>
                <p className="w-full rounded-lg text-gray-800">
                  {postComments[0].content}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={onOpen}
                className="mx-2 text-gray-800 font-semibold cursor-pointer"
              >
                view all comments
                <CiCircleChevDown className="inline-block mx-1 text-xl" />
              </button>
              {post.user._id === userData._id &&
              userData._id === postComments[0].commentCreator._id ? (
                <>
                  <Dropdown className="bg-blur font-bold ">
                    <DropdownTrigger>
                      <HiDotsVertical className="text-2xl" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" variant="faded">
                      <DropdownItem
                        key="edit"
                        startContent={<CiEdit className="text-2xl" />}
                      >
                        Edit Post
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        startContent={<AiFillDelete className="text-2xl" />}
                      >
                        Delete Post
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <PostDetails
            postId={post._id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            setPostComments={setPostComments}
            postComments={postComments}
          />
        </>
      )}
    </>
  );
}
