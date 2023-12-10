import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string({
    required_error: "User ID is required",
  }),
  date: z.string({
    required_error: "Date is required",
  }),
  totalAmount: z.number({
    required_error: "Total amount is required",
  }),
});

export const requestSchema = z.object({
  body: orderSchema,
});