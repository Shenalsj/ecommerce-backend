import { JwtPayload } from "jsonwebtoken"
import { Document } from "mongoose"

export interface DecodedUser extends JwtPayload {
  userId: string
  email: string
}

export const role = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const

export type Role = keyof typeof role

export type User = {
  name: string
  email: string
  password: string
  role: Role
}
