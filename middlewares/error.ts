import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

import { ApiError } from "../errors/ApiError"

export function apiErrorHandler(
  error: typeof ApiError | Error,
  req: Request,
  res: Response,
  _: NextFunction
) {
  if (error instanceof ApiError) {
    res.status(error.code).json({ msg: error.message })
    return
  }

  res.status(500).json({ msg: "Something went wrong" })
}
