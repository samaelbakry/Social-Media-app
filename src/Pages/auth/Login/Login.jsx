import { Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../Lib/Schema/registerSchema";
import { FaRegEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { loginForm } from "../../../Services/authServices";
import { homeContext } from "../../../context/HomeContext";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(homeContext);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  async function sendFormData(formData) {
    try {
      const response = await loginForm(formData);
      console.log(response);
      if (response.data.message === "success") {
        setTimeout(() => {
          navigate("/home");
          localStorage.setItem("token", response.data.token);
          setIsLoggedIn(true);
         
        }, 2000);
        
         toast.success("Account Logged in Successfully !", {
            position: "top-center",
          })
      }
    } catch (error) {
      toast.error("Your email or password does not match our records", {
        position: "top-center",
      });
    }
  }

  return (
    <>
      <main className="lg:max-w-4xl  w-full space-y-5 relative top-30 shadow-lg p-5 rounded-2xl bg-gray-200  border border-gray-300">
        <h1 className="text-4xl font-bold space-x-2 capitalize text-violet-900">
          welcome back to <span className="uppercase">echo</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </h1>
        <p className="text-2xl font-semibold text-gray-700">login now !</p>
        <form className="space-y-5" onSubmit={handleSubmit(sendFormData)}>
          <Input
            {...register("email")}
            label="email"
            type="email"
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
          />

          <Input
            {...register("password")}
            label="password"
            type={showPassword ? "text" : "password"}
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password)}
            endContent={
              showPassword ? (
                <LuEyeClosed
                  className="text-2xl inline-block text-gray-600 cursor-pointer"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                />
              ) : (
                <FaRegEye
                  className="text-2xl inline-block text-gray-600 cursor-pointer"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                />
              )
            }
          />

          <div className="flex items-center justify-between">
            <Button
              isLoading={isSubmitting}
              type="submit"
              color="secondary"
              variant="shadow"
            >
              Login
            </Button>
            <p>
              Don't have an account ?
              <Link className="font-bold mx-1" to={"/Register"}>
                log in
              </Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
}
