import React, { useContext, useRef , useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Badge,
  Input,
} from "@heroui/react";
import { IoCreateOutline } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { homeContext } from "../../context/HomeContext";

export default function CreatePostDetails() {
    const {userData} = useContext(homeContext)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop] = React.useState("blur");
  const [selectedImage, setSelectedImage] = useState("")

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
    onClose()
  }


  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button className="bg-gray-100 p-1 m-2" onPress={onOpen}>
          <span className="text-md font-bold text-violet-900 p-4 cursor-pointer ">
            Create post
            <IoCreateOutline className="inline-block mx-2" />
          </span>
        </Button>
      </div>
      <Modal backdrop={backdrop} scrollBehavior="inside" isOpen={isOpen} onClose={handleClose} >
        <ModalContent className="bg-blur max-w-3xl">
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-4">
                <img
                  src={userData.photo}
                  alt={userData.name}
                  className=" w-13 rounded-full bg-transparent m-2"
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
                  placeholder="Got something to say ?...."
                  ref={textArea}
                  minRows={ selectedImage ? " " : "8" } />
                  {selectedImage && <img src={URL.createObjectURL(selectedImage)} className="size-80 object-cover"  alt="post-image"/> }
                </div>
              </ModalBody>
                 <ModalFooter className="flex items-center gap-4">
                  <Input ref={inputFile} onChange={chooseFile} className="hidden" type="file"/>
                  <ImAttachment onClick={openFile}  className="text-2xl text-gray-300 cursor-pointer"/>
                <Button color="secondary">
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
