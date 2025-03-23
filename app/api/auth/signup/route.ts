import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { validateFields } from "../../helper";
import User from "@/database/models/User";
import dbConnect from "@/database/dbconnection";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = validateFields(body);
    if (validationResult) {
      return NextResponse.json({ error: validationResult }, { status: 401 });
    } else {
      const { name, email, password, phonenumber, usertype } = body;
      await dbConnect();
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phonenumber,
        usertype: usertype.toLowerCase(),
      });
      await newUser.save();
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
