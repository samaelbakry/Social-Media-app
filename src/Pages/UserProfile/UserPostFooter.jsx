import { FcLike } from "react-icons/fc";
import { BiLike } from "react-icons/bi";
import { FaComment,  FaRegFaceLaughSquint } from "react-icons/fa6";

export default function UserPostFooter() {
  return <>
   {/* FOOTER */}
        {/* REACTIONS */}
        <div className="reactions flex justify-between">
          <div className="icon-wrap flex items-center">
            <FcLike  className="text-2xl" />
            <BiLike className="text-2xl text-blue-400"/>
            <FaRegFaceLaughSquint className="text-2xl text-amber-300" />
            <span className="text-md mx-2 text-gray-800 font-bold">Reactions</span>
          </div>
          <div className="comments flex items-center">
            <FaComment className="text-xl text-gray-800 mx-2" />
            <span className="text-md text-gray-800 font-bold">
              1200 Comment
            </span>
          </div>
        </div>
  </>
}
