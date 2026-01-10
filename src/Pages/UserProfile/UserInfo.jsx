import { Button, Divider, Input } from "@heroui/react";
import { CiUser } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineIdentification } from "react-icons/hi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdAlternateEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { homeContext } from "../../context/HomeContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { changeUserPassword } from "../../Services/userServices";
import { passwordSchema } from "../../Lib/Schema/changePasswordSchema";
import { toast } from "react-toastify";
import image1 from "../../assets/p-1.jpg";
import image2 from "../../assets/p-2.jpg";
import image3 from "../../assets/p-3.jpg";
import image4 from "../../assets/p-4.jpg";
import image5 from "../../assets/p-5.jpg";



export default function UserInfo() {
    const { userData } = useContext(homeContext)
    const [isLoading, setIsLoading] = useState(false)
    const info = [
    {
      icon:<MdDriveFileRenameOutline className="text-violet-900 text-2xl"/>,
      data:userData.name
    },
    {
      icon:<MdAlternateEmail className="text-violet-900 text-2xl"/>,
      data:userData.email
    },
    {
      icon:<HiOutlineIdentification className="text-violet-900 text-2xl"/>,
      data:"_id "+userData._id
    },
    {
    icon:<CiUser className="text-violet-900 text-2xl"/>,
    data:userData.gender
  },
  {
    icon:<LiaBirthdayCakeSolid className="text-violet-900 text-2xl"/>,
    data:userData.dateOfBirth
  }]
    const friends = [
    {
      src: image1,
    },
    {
      src: image2,
    },
    {
      src: image3,
    },
    {
      src: image4,
    },
    {
      src: image5,
    },
  ];
  const { register , handleSubmit ,formState:{errors} } = useForm({
    defaultValues:{
    password:"",
    newPassword:""
    },
    resolver:zodResolver(passwordSchema)
  })
  async function changeMyPassword(formObj) {
    setIsLoading(true)
    try {
        const {data} = await changeUserPassword(formObj)
        console.log(data); 
        if(data.message === "success"){
      localStorage.setItem("token" ,data.token)
      toast.success("password changed Successfully !" , { position:"top-center"})
     
    } 
    } catch (error) {
        console.log(error);
    }finally{
        setIsLoading(false)
    }
  }
  return <>
    {/* USER INFO */}
    <div className="lg:col-span-3 col-span-4 bg-blur p-5 space-y-4 m-5 self-start">
    <span className="mb-5 p-2 text-2xl ">Account information</span>
    <Divider/>
    {info.map((info) => <div className="flex items-center gap-4 "> 
    {info.icon}
    <span className="text-xl font-semibold">{info.data}</span>
  </div>)}
  <form onSubmit={handleSubmit(changeMyPassword)}>
   <div className="flex flex-col space-y-5">
    <span className="text-2xl p-1 m-1">Update your information</span>
    <Divider/>
    <Input {...register("password")} className="text-2xl" type="text" placeholder="Enter your password"endContent={ <TbLockPassword />} errorMessage={errors.name?.message} isInvalid={Boolean(errors.name)}/>
    <Input {...register("newPassword")} className="text-2xl" type="text" placeholder="Enter new password" endContent={ <TbLockPassword />} errorMessage={errors.name?.message} isInvalid={Boolean(errors.name)}/>
     <Button type="submit" isLoading={isLoading} color="secondary" className="w-fit"> Change password</Button>
   </div>
  </form>

  <div className="bg-blur md:flex flex-col items-center p-3 hidden">
    <div className="flex justify-between items-center p-2 gap-5  font-semibold">
      <span className="text-lg">Friends</span>
      <span className="text-lg">1,200</span>
      <span className="text-md text-violet-900">see all your friends</span>
    </div>
     <Divider/>
  <div className="flex flex-wrap gap-5 mt-5">
      {friends.map( (friend , index)=>(<>
      <img key={index} src={friend.src} alt="your-friends" className="w-3/10 rounded-2xl shadow" />
    </>
  ))}
  </div>
  </div>


    </div>
    
  </>
}
