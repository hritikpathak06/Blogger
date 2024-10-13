import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BlogCard = ({ data, admin }: any) => {

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/blog/${data._id}`);
      toast.success("Blog Deleted Successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Somethign went wrong");
    }
  };

  const handleUpdate = () => {
    router.push(`/update/${data._id}`)
  };

  return (
    <div className="w-full">
      <Card className="h-130 w-full">
        <CardHeader>
          <CardTitle className="font-bold text-3xl">{data.title}</CardTitle>
          <CardDescription>{data.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-3/5">
          <Link href={`/blog/${data._id}`}>
            <div className="relative w-72 h-36">
              <Image
                src={data.imageUrl}
                alt="image"
                layout="fill"
                className="object-cover"
              />
            </div>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between items-center flex-col">
          <p>
            Author:{" "}
            <span className="text-xl font-bold">{data.userId?.userName}</span>
          </p>
          {admin === "admin" && ( // Only show buttons if admin is true
            <div>
              <button
                onClick={handleUpdate}
                className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogCard;
