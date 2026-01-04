import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  Input,
} from "@heroui/react";
import { IoIosSearch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { homeContext } from "../../context/HomeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { setIsLoggedIn , userData } = useContext(homeContext);
  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <>
      <HeroNavbar className="shadow-lg bg-gray-200" maxWidth="xl">
        {/* LOGO */}
        <NavbarBrand className=" flex lg:hidden items-center m-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 text-violet-900 mx-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h1 className="font-bold text-4xl text-violet-900">ECHO</h1>
        </NavbarBrand>
        {/* SEARCH INPUT */}
        <NavbarContent as="div">
          <Input
            classNames={{
              base: "w-full",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<IoIosSearch className="text-2xl" />}
            type="search"
            className="lg:block hidden"
          />
         
        </NavbarContent>
        {/* LOG OUT  AND USER PROFILE*/}
        <NavbarContent as="div" justify="end" className="space-x-2" >
           <Link to={"/userprofile"}>
            <img
              src={userData.photo}
              alt={userData.name}
              className=" size-9 object-cover rounded-full m-2 shadow shadow-violet-400 lg:hidden"
            />
          </Link>
          <span className="text-lg font-bold text-red-500 flex items-center gap-1">  
            <CiLogout
            onClick={logOut}
            className="text-2xl text-red-500 cursor-pointer"
          /> Log out
          </span>
        </NavbarContent>
      </HeroNavbar>
    </>
  );
}
