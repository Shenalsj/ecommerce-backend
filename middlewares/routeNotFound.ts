import { Request, Response } from "express"

export function routeNotFound(_: Request, res: Response) {
  res.status(404).json({ msg: "Route Not Found." })
}
