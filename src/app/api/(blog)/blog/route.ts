import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const blogs = await Blog.find().populate("userId").sort({ createdAt: -1 });
    return NextResponse.json(
      {
        blogs,
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
