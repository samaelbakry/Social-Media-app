import { FaPlus } from 'react-icons/fa';
import image1 from "../../assets/p-1.jpg";
import image2 from "../../assets/p-2.jpg";
import image3 from "../../assets/p-3.jpg";
import image4 from "../../assets/p-4.jpg";
import image5 from "../../assets/p-5.jpg";

export default function Stories() {
     const stories = [
    {
      type: "add",
      name: "Add your story",
    },
    {
      type: "image",
      src: image1,
    },
    {
      type: "image",
      src: image2,
    },
    {
      type: "image",
      src: image3,
    },
    {
      type: "image",
      src: image4,
    },
    {
      type: "image",
      src: image5,
    },
  ];
  return <>
   <div className="hidden md:flex justify-between items-center">
                <h2 className="text-xl font-bold mx-5">Stories</h2>
                <h2 className="text-sm mx-5">view all...</h2>
              </div>
              <div className="hidden md:flex justify-center items-center gap-10 p-5">
                {stories.map((story, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {story.type === "add" ? (
                      <div className="rounded-full size-12 outline-2 outline-violet-500 outline-offset-4 flex  justify-center items-center cursor-pointer">
                        <FaPlus className="text-xl text-violet-500" />
                      </div>
                    ) : (
                      <img
                        src={story.src}
                        alt="story"
                        className="size-16 rounded-full outline-2 outline-violet-500 outline-offset-4 object-cover cursor-pointer"
                      />
                    )}
                    {story.name && (
                      <span className="text-sm font-light mt-2">
                        {story.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
  </>
}
