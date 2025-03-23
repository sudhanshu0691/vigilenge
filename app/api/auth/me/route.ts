import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const decoded = await verifyToken(token)
    return NextResponse.json(decoded)
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }
} 