import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // TODO: Replace with actual database authentication
    // This is a mock authentication
    if (email === "ndrf@assam.gov.in" && password === "ndrf123") {
      const user = {
        id: "1",
        name: "NDRF User",
        email,
        role: "NDRF" as const,
      }

      const token = sign(user, JWT_SECRET, { expiresIn: "1d" })

      // Set the auth cookie
      cookies().set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/", // Make sure cookie is available for all paths
      })

      return NextResponse.json(user)
    }

    // For demo purposes, also allow test@example.com
    if (email === "test@example.com" && password === "test123") {
      const user = {
        id: "2",
        name: "Test User",
        email,
        role: "user" as const,
      }

      const token = sign(user, JWT_SECRET, { expiresIn: "1d" })

      cookies().set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      })

      return NextResponse.json(user)
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 