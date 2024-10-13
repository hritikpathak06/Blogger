import { authMiddleware } from "@/lib/auth-middleware";
import { connect_db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
connect_db();

export async function GET(req: NextRequest) {
  try {
    const user = await authMiddleware(req);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      msg: error.message,
    });
  }
}
