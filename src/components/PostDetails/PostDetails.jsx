import { useContext, useEffect, useState } from "react";
import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";
import { getPostsId } from "../../Services/allPostsServices";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import PostHeader from "../Card/PostHeader";
import PostBody from "../Card/PostBody";
import { FcLike } from "react-icons/fc";
import { BiLike } from "react-icons/bi";
import { FaRegFaceLaughSquint } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import Comments from "../Comments/Comments";


export default function PostDetails({ onOpenChange,isOpen, postId, setPostComments, postComments }) {
 const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState("");

  async function getDetails() {
    setIsLoading(true);
    try {
      const { data } = await getPostsId(postId);
      setPost(data.post);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      getDetails();
    }
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={isOpen}
          scrollBehavior="inside"
          onOpenChange={onOpenChange}
        >
          <ModalContent className="max-w-3xl rounded-2xl p-3 bg-blur text-white">
            {(onClose) => (
              <>
                {isLoading ? ( <PostSkeleton />) : (
                  <>
                    {post && (
                      <>
                        <ModalBody>
                          <PostHeader post={post} />
                          <PostBody postDetails post={post} />
                          {/* POST FOOTER */}
                          {/* REACTIONS */}
                          <div className="reactions flex justify-between">
                            <div className="icon-wrap flex items-center">
                              <FcLike className="text-2xl" />
                              <BiLike className="text-2xl text-blue-400" />
                              <FaRegFaceLaughSquint className="text-2xl text-amber-300" />
                              <span className="text-md mx-2 text-gray-800 font-bold">
                                reactions
                              </span>
                            </div>
                            <div className="comments flex items-center">
                              <FaComment className="text-xl text-gray-800 mx-2" />
                              <span className="text-md text-gray-800 font-bold">
                                {postComments.length} Comment
                              </span>
                            </div>
                          </div>
                          {/* (ALL COMMENTS) *//* COMMENT INPUT */}
                          {postComments.length !== 0 && <Comments postComments={postComments}  post={post} setPostComments={setPostComments} />}
                        </ModalBody>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
