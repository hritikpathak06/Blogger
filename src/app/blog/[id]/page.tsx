"use client";
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

  return (
    <div className="container mx-auto p-6">
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
            <h2 className="text-xl text-gray-600 mb-4">{blog.subtitle}</h2>
            <p className="text-gray-800 mb-4">{blog.description}</p>
            <p className="text-gray-600 italic">
              Author: <span className="font-bold">{blog.userId?.userName}</span>
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Page;
