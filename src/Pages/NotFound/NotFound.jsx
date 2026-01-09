import { Link } from "react-router-dom";
import notFound from "../../assets/notFound.jpg"


export default function NotFound() {
  return <>
  <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
    <img src={notFound}  className="max-h-[50vh] object-contain" alt="not-found-image" />
    <h1 className='text-5xl text-violet-900 font-bold'>
      Sorry! I think you broke the path
    </h1>
    <p className='text-gray-500 text-xl font-semibold uppercase'>404- page not found</p>
    <Link to={"/"}>
        <button className="text-gray-50 font-semibold bg-violet-800 rounded-2xl py-2 px-5 cursor-pointer shadow-xl text-xl hover:bg-violet-600 hover:duration-200">Back to Home</button>
    </Link>
  </div>
  </>
}
