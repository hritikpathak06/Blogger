import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/models/user.model";
import { connect_db } from "@/lib/db";
connect_db();

export const POST = async (req: NextRequest) => {
  try {
    const { email, password, userName } = await req.json();
    if (!email || !password || !userName) {
      return NextResponse.json(
        JSON.stringify({
          error: "Email, password, and user_name are required",
        }),
        { status: 400 }
      );
    }
    const exsisting_user = await User.findOne({ email });
    if (exsisting_user) {
      return NextResponse.json({ msg: "user already exists" }, { status: 400 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    const new_user = new User({
      email,
      password: hashed_password,
      userName,
    });
    await new_user.save();
    return NextResponse.json(
      { msg: "registration successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(JSON.stringify(error), { status: 500 });
  }
};
