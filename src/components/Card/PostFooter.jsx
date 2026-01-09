import { BiLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { IoIosSend } from "react-icons/io";
import userImage from "../../assets/userImage2.jpg";
import { CiCircleChevDown, CiEdit } from "react-icons/ci";
import PostDetails from "../PostDetails/PostDetails";
import { Button,Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure,} from "@heroui/react";
import {createComment, deleteComment,getPostComments,updateComment,} from "../../Services/comments";
import { useContext, useState } from "react";
import { homeContext } from "../../context/HomeContext";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";

export default function PostFooter({ post, postComments, setPostComments }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentMsg, setCommentMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState("");

  const { userData } = useContext(homeContext);

  async function sendComment(comment) { // sending comment
    setIsLoading(true);
    try {
      const { data } = await createComment(comment);
      setPostComments(data.comments);
      setCommentMsg("");
      getNewComments()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteMyComment(commentId) { // delete comment
    setIsLoading(true);
    try {
      const { data } = await deleteComment(commentId);
      console.log(data);
      getNewComments();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getNewComments() { // re-rendering posts comments
    setIsLoading(true);
    try {
      const { data } = await getPostComments(post._id);
      console.log(data);
      setPostComments(data.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function getComment(e) { // getting input value
    setCommentMsg(e.target.value);
  }

  async function updateMyComment(commentId, content) { //update comment
    try {
      const { data } = await updateComment(commentId, { content });
      setCommentMsg("");
      setEditingCommentId("");
      getNewComments();
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <>
      <div className="card-footer ">
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
              {postComments.length} Comment
            </span>
          </div>
        </div>
        {/* COMMENT INPUT */}
        <div className=" flex items-center justify-center gap-4 m-2 p-3">
          <input
            value={commentMsg}
            onChange={(e) => getComment(e)}
            type="text"
            placeholder=" Add comment...."
            className="bg-gray-200/60 rounded-xl w-full p-2 placeholder:text-gray-700"
          />
          <Button disabled={commentMsg ? false : true} isLoading={isLoading}
            onPress={() => {
              if (editingCommentId) {
                updateMyComment(editingCommentId, commentMsg);
              } else {
                sendComment({
                  content: commentMsg,
                  post: post._id,
                });
              }
            }}
            className="cursor-pointer bg-violet-600 shadow-2xl  rounded-3xl disabled:bg-gray-200 disabled:shadow-violet-500 disabled:shadow disabled:cursor-not-allowed ">
            <IoIosSend className="text-3xl text-gray-300 " />
          </Button>
        </div>
        {/* COMMENT DATA */}
        {postComments.length !== 0 && (
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
                          onPress={() => {
                            setCommentMsg(postComments[0].content);
                            setEditingCommentId(postComments[0]._id);
                          }}
                          startContent={<CiEdit className="text-2xl" />}
                        >
                          Edit comment
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          onPress={() => {
                            deleteMyComment(postComments[0]._id);
                          }}
                          className="text-danger"
                          color="danger"
                          startContent={<AiFillDelete className="text-2xl" />}
                        >
                          Delete comment
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
              post={post}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              setPostComments={setPostComments}
              postComments={postComments}
            />
          </>
        )}
      </div>
    </>
  );
}
