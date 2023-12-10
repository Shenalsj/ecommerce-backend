import { z } from "zod"

export const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
})

export const requestSchema = z.object({
  body: userSchema,
})
