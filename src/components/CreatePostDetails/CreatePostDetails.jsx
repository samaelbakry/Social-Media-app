import React, { useContext, useRef , useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Badge,
  Input,
} from "@heroui/react";
import { ImAttachment } from "react-icons/im";
import { homeContext } from "../../context/HomeContext";
import { createPost, updatePost } from "../../Services/allPostsServices";
import { toast } from "react-toastify";

export default function CreatePostDetails( { getPosts , isOpen , onOpen ,onOpenChange, onClose ,getAllUserPosts, post }) {
  const {userData} = useContext(homeContext)
  const [backdrop] = React.useState("blur");
  const [selectedImage, setSelectedImage] = useState(post?.image || "")
  const [isLoading, setIsLoading] = useState(false)


  const textArea = useRef()
  const inputFile = useRef()

  function chooseFile(){
    const file = inputFile.current.files[0]
    setSelectedImage(file)
  }
  function openFile(){
    inputFile.current.click()
  }
  function handleClose(){
    setSelectedImage("")
    onOpenChange(false)
    onClose()
  }

  async function createNewPost() {
    const formData= new FormData()
    if(textArea.current.value){
      formData.append("body",textArea.current.value)
    }
    if(selectedImage){
      formData.append("image",selectedImage)
    }
    setIsLoading(true)
    try {
      if(post)
        { const { data } = await updatePost(post?._id , formData)
      toast.success('Done! Your post is updated')
      console.log(data);
    }
      else
        {const { data } = await createPost(formData)
       toast.success('Your post was published')
      console.log(data);
    }
      getPosts()
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
      // getAllUserPosts()
      onClose()
    }
  }


  return (
    <>
     
      <Modal backdrop={backdrop} scrollBehavior="inside" isOpen={isOpen} onClose={handleClose} >
        <ModalContent className="bg-blur max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-4">
                <img
                  src={userData.photo}
                  alt={userData.name}
                  className="size-20 rounded-full object-cover bg-transparent shadow shadow-violet-500 m-2"
                />
                <div className="flex flex-col gap-1">
                  <span className="capitalize">{userData.name}</span>
                  <Badge content="" color="success" placement="top-right"shape="circle" size="sm" className="translate-x-4 -translate-y-1" >
                    <span>active</span>
                  </Badge>
                </div>
              </ModalHeader>
              <ModalBody className="bg-gray-50 shadow text-black shadow-violet-300 rounded-2xl p-4 m-4 ">
                <div className="flex flex-col gap-4 items-center">
                  <Textarea
                  defaultValue={post?.body}  
                  placeholder={ post ? "Update" : "Got something to say ?...."}
                  ref={textArea}
                  minRows={ selectedImage ? " " : "8" } />
                  {selectedImage && <img src={ post?.image ? post?.image : URL.createObjectURL(selectedImage)} className="size-80 object-cover"  alt="post-image"/> }
                </div>
              </ModalBody>
                 <ModalFooter className="flex items-center gap-4">
                  <span className="font-semibold text-white">Only JPG, JPEG, or PNG images are allowed</span>
                  <Input ref={inputFile} accept="image/png,image/jpeg,image/jpg" onChange={chooseFile} className="hidden" type="file"/>
                  <ImAttachment onClick={openFile}  className="text-2xl text-gray-300 cursor-pointer"/>
                  
                <Button isLoading={isLoading} onPress={createNewPost} color="secondary">
                   { post ? "Update" : "Upload"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
