"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UpdateBlogPage = ({ params }: any) => {
  const { blogId } = params;
  const [blog, setBlog] = useState<any>({});
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${blogId}`);
        setBlog(data.blog);
        setTitle(data.blog.title);
        setSubtitle(data.blog.subtitle);
        setDescription(data.blog.description);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    try {
      const { data } = await axios.put(`/api/blog/${blogId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Blog updated successfully!");
      toast.success("Blog Updated Successfully");
      setBlog(data.blog);
      router.push("/my-profile");
    } catch (error) {
      console.error("Error updating blog:", error);
      setMessage("Error updating blog. Please try again.");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-neutral-800 text-white">
      <h1 className="text-4xl font-bold mb-4 text-center">Update Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:w-[60%] w-full mx-auto"
      >
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block mb-1">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded text-black"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />
        </div>
        {blog.imageUrl && (
          <div>
            <p>Current Image:</p>
            <img
              src={blog.imageUrl}
              alt="Current blog image"
              className="max-w-xs mt-2 mx-auto"
            />
          </div>
        )}
        <div className="  flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 md:w-[60%]  w-full  text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default UpdateBlogPage;
