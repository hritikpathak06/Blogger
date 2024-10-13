import { v2 as cloudinary } from "cloudinary";
import { connect_db } from "@/lib/db";
import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

connect_db();

export async function GET(req: NextRequest, content: any) {
  try {
    const id = content.params.id;
    const blog = await Blog.findById(id).populate("userId");
    return NextResponse.json(
      {
        blog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, content: any) {
  try {
    const id = content.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    return NextResponse.json(
      {
        msg: "Blog Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}


cloudinary.config({
  cloud_name: "drbzzh6j7",
  api_key: "776943229854165",
  api_secret: "RWZatGE-U7hTRE0Re8XM8JnVv84",
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const blogId = params.id;
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;

    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    if (title) existingBlog.title = title;
    if (subtitle) existingBlog.subtitle = subtitle;
    if (description) existingBlog.description = description;

    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      // @ts-ignore (to handle the type mismatch from the Promise)
      existingBlog.imageUrl = cloudinaryResponse.secure_url;
    }

    await existingBlog.save();

    return NextResponse.json({ message: "Blog post updated successfully", blog: existingBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}