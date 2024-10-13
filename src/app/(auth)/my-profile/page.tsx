"use client";
import BlogCard from "@/components/Blog/BlogCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [blogs, setBlogs] = useState<any>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/user-blog");
      setBlogs(data.blogs);
    })();
  }, []);

  return (
    <>
      <div className=" min-h-screen w-full">
        <h1 className=" text-5xl p-10 mb-10 font-extrabold text-center">
          My Blogs
        </h1>
        <div className=" md:flex-row flex flex-col items-center gap-10 flex-wrap justify-start w-[80%] mx-auto">
          {blogs?.map((data: any, index: any) => (
            <div
              className=" md:w-[30%] w-full flex items-center justify-center flex-col"
              key={index}
            >
              <BlogCard data={data} admin="admin"/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
