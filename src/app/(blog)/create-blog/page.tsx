import BlogForm from "@/components/Blog/BlogForm";
import React from "react";

const page = () => {


  return (
    <div className=" flex flex-col items-center justify-center bg-neutral-800">
      <div className=" w-[80%]">
        <BlogForm/>
      </div>
    </div>
  );
};

export default page;
