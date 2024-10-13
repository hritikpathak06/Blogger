import { authMiddleware } from "@/lib/auth-middleware";
import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await authMiddleware(req);


    const blogs = await Blog.find({
      userId: user._id,
    })
      .populate("userId")
      .sort({ createdAt: -1 });
    return NextResponse.json(
      {
        blogs,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        msg: error.message,
      },
      { status: 500 }
    );
  }
}
