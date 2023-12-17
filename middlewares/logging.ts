import { NextFunction, Request, Response } from "express"

export function loggingMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  next()
}
