import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

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
