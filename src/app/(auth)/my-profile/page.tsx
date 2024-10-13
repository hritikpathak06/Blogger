"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/Blog/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";

const MyBlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/user-blog");
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const SkeletonBlogCard = () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-md bg-white" />
      <Skeleton className="h-4 w-[250px] bg-white" />
      <Skeleton className="h-4 w-[200px] bg-white" />
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-neutral-800 text-white">
      <h1 className="text-5xl p-10 mb-10 font-extrabold text-center">
        My Blogs
      </h1>
      <div className="md:flex-row flex flex-col items-center gap-10 flex-wrap justify-start w-[80%] mx-auto">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="md:w-[30%] w-full flex items-center justify-center flex-col"
                >
                  <SkeletonBlogCard />
                </div>
              ))
          : blogs.map((blog, index) => (
              <div
                key={blog._id || index}
                className="md:w-[30%] w-full flex items-center justify-center flex-col"
              >
                <BlogCard data={blog} admin="admin" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default MyBlogsPage;
