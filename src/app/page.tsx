"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/Blog/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blog?search=${searchQuery}`);
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced Func
  useEffect(() => {
    const debounced = setTimeout(() => {
      fetchBlogs();
    }, 500);
    return () => clearTimeout(debounced);
  }, [searchQuery]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.set("search", searchQuery);
    }

    const queryString = queryParams.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newPath);
  }, [searchQuery, router, pathname]);

  const SkeletonBlogCard = () => (
    <div className="flex flex-col space-y-3 ">
      <Skeleton className="h-[200px] w-full rounded-md bg-white" />
      <Skeleton className="h-4 w-[250px] bg-white" />
      <Skeleton className="h-4 w-[200px] bg-white" />
    </div>
  );

  return (
    <div className="pt-10 min-h-screen w-full bg-neutral-800">
      <div className="w-[80%] mx-auto mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
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
          : blogs?.map((blog, index) => (
              <div
                key={blog._id || index}
                className="md:w-[30%] w-full flex items-center justify-center flex-col"
              >
                <BlogCard data={blog} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default BlogListPage;
