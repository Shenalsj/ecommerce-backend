import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { requestSchema } from "../schemas/orderDetailSchema";

export async function validateOrderDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await requestSchema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
}
