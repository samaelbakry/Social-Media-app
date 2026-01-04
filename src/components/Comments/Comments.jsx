import { Button } from "@heroui/react";
import userImage from "../../assets/userImage2.jpg";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import { createComment } from "../../Services/comments";

export default function Comments({postComments , setPostComments , post}) {
    
      const [commentMsg, setCommentMsg] = useState("");
      const [isLoading, setIsLoading] = useState(false);

    async function sendComment(comment) {
    setIsLoading(true);
    try {
      const { data } = await createComment(comment);
      console.log(data);
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
  return <>
   <div className=" flex items-center justify-center gap-4 m-2 p-3">
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
                              className="cursor-pointer bg-violet-600 shadow-xl outline-2 outline-violet-300 outline-offset-4 rounded-3xl disabled:bg-transparent disabled:shadow-violet-500 disabled:shadow disabled:cursor-not-allowed disabled:outline-0"
                            >
                              <IoIosSend className="text-3xl text-gray-200" />
                            </Button>
                          </div>

                {postComments.map((comment) => (
                                <>
                                  <div className=" gap-2 flex justify-between items-center bg-gray-200/60 p-2 rounded-2xl">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={
                                          comment.commentCreator.photo.includes(
                                            "/undefined"
                                          )
                                            ? userImage
                                            : comment.commentCreator.photo
                                        }
                                        alt=""
                                        className=" border border-violet-900 outline-offset-4 m-2 rounded-full size-10"
                                      />

                                      <div className="flex flex-col gap-1">
                                        <span className="font-bold capitalize text-gray-800">
                                          {comment.commentCreator.name}
                                        </span>
                                        <p className="w-full rounded-lg text-gray-800">
                                          {comment.content}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ))}
  </>
}
