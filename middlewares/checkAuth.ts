import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"

import { ApiError } from "../errors/ApiError"
import { DecodedUser } from "../types/user"

export interface WithAuthRequest extends Request {
  decoded?: DecodedUser
}

export function checkAuth(req: WithAuthRequest,_: Response,next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1]
  console.log("token:",token)
  if (!token) {
    next(ApiError.forbidden("Token is missing"))
    return
  }

  try {
    const decoded = jwt.verify(token,process.env.TOKEN_SECRET as string) as DecodedUser
    req.decoded = decoded
    next()
  } catch (err) {
    next(ApiError.forbidden("Invalid token"))
  }
}