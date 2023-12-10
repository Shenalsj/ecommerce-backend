import { z } from "zod";

export const orderDetailSchema = z.object({
  orderId: z.string({
    required_error: "OrderId is required",
  }),
  productId: z.string({
    required_error: "ProductId is required",
  }),
  quantity: z.number({
    required_error: "quantity is required",
  }),
  priceAtPurchase: z.number({
    required_error: "priceAtPurchase is required",
  }),
});

export const requestSchema = z.object({
  body: orderDetailSchema,
});
