import { NextFunction, Request, Response } from "express";

import { productSchema } from "../schemas/productSchema";

export async function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await productSchema.parseAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
}

