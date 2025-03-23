import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a mock API endpoint - in a real app, you would connect to a database
export async function GET(request: NextRequest) {
  // Get the user ID from the request (e.g., from a cookie or auth header)
  // For this example, we'll just return mock data

  return NextResponse.json({
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
      locations: [
        { id: 1, name: "Darjeeling", radius: 25 },
        { id: 2, name: "Sikkim", radius: 15 },
      ],
    },
  })
}

export async function PUT(request: NextRequest) {
  const data = await request.json()

  // In a real app, you would update the user in the database
  // For this example, we'll just return the data that was sent

  return NextResponse.json({
    ...data,
    updated: true,
  })
}

