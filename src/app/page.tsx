"use client";
import BlogCard from "@/components/Blog/BlogCard";
import { useCurrentUser } from "@/context/userContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

function page() {
  const [blogs, setBlogs] = useState<any>();

  const {loggedInUser}:any = useCurrentUser();

  console.log("LoggedIn user===>>> ",loggedInUser)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/blog");
      console.log("Data===>> ", data);
      setBlogs(data.blogs);
    })();
  }, []);

  // console.log("Bloggsss ===> ", blogs);

  return (
    <div className=" pt-10 min-h-screen w-full">
      <div className=" flex items-center gap-10 flex-wrap justify-start w-[80%] mx-auto">
        {blogs?.map((data: any, index: any) => (
          <div className=" w-[30%] flex items-center justify-center flex-col" key={index}>
            <BlogCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
