import dbConnect from "@/database/dbconnection";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../helper";
import User from "@/database/models/User";

export async function GET(req: NextRequest) {
  await dbConnect();

  const decoded = verifyToken(req);

  if (!decoded || typeof decoded !== 'object' || !decoded.id) {
    return NextResponse.json({ error: 'Unauthorized or invalid token.' }, { status: 401 });
  }

  try {
    const user = await User.findById(decoded.id).select('name email phonenumber usertype');
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }
    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
