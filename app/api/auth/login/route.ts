import { NextRequest, NextResponse } from "next/server";
import User from "@/database/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/database/dbconnection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = user.generateAuthToken();
    user.token = token;
    await user.save();

    const response = NextResponse.json({
      message: "Login successful",
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
      usertype: user.usertype,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return response; // **Return the response here**
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
