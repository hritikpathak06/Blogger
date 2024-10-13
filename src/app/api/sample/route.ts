import { connect_db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

connect_db();

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json(
      {
        suxcces: "hello",
      },
      { status: 500 }
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
