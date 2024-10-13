import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); // Get the URL search params
    const searchQuery = searchParams.get("search"); // Extract the query parameter

    // Build the filter object
    const filter = searchQuery
      ? {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive match for title
            { description: { $regex: searchQuery, $options: "i" } }, // Case-insensitive match for description
          ],
        }
      : {};

    const blogs = await Blog.find(filter).populate("userId").sort({ createdAt: -1 });

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
