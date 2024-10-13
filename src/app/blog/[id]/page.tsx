"use client";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = ({ params }: any) => {
  const { id } = params;
  const [blog, setBlog] = useState<any>();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/blog/${id}`);
      console.log("Data===>>> ", data);
      setBlog(data.blog);
    })();
  }, [id]);

  const SkeletonBlogCard = () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-md" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );

  return (
    <div className="container mx-auto p-6 bg-neutral-800 text-white">
      {blog ? (
        <div className="w-full rounded-lg shadow-lg overflow-hidden">
          <div className=" h-[40vh] w-full mb-10">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-90 h-80 object-cover mx-auto mb-10"
            />
          </div>
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <h2 className="text-xl text-white mb-4">{blog.subtitle}</h2>
            <p className=" text-white mb-4">{blog.description}</p>
            <p className=" text-white italic">
              Author: <span className="font-bold">{blog.userId?.userName}</span>
            </p>
          </div>
        </div>
      ) : (
        Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="md:w-[30%] w-full flex items-center justify-center"
            >
              <SkeletonBlogCard />
            </div>
          ))
      )}
    </div>
  );
};

export default Page;
