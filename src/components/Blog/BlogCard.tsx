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

const BlogCard = ({ data }: any) => {
  return (
    <>
      <div className=" w-full">
        <Link href={`/blog/${data._id}`}>
          <Card>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>{data.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={data.imageUrl} alt="image" height={180} width={280} />
            </CardContent>
            <CardFooter>
              <p>{data.userId?.userName}</p>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
