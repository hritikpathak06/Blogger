import React from "react";
import SignUpLogo from "@/assets/signup-logo.png";
import Image from "next/image";
import Register from "@/components/client/Auth/Register";
import Login from "@/components/client/Auth/Login";

const page = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-neutral-800 text-gray-200 overflow-hidden">
        <div className="hidden lg:block w-1/2 h-screen">
          <Image
            src={SignUpLogo}
            alt="signup_page"
            height={100}
            width={100}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 h-screen flex items-center justify-center">
          <Login />
        </div>
      </div>
    </>
  );
};

export default page;
