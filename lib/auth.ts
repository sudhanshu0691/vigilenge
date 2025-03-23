import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const secret = new TextEncoder().encode(JWT_SECRET)

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export async function createToken(user: User) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)

  return token
}

export async function verifyToken(token: string): Promise<User> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as User
  } catch (error) {
    throw new Error("Invalid token")
  }
}

export function hashPassword(password: string): string {
  // In a real application, you should use a proper password hashing library
  // like bcrypt or argon2
  return password
}

export function comparePasswords(password: string, hashedPassword: string): boolean {
  // In a real application, you should use a proper password comparison
  // that handles the hashing algorithm used
  return password === hashedPassword
} 