import express, { NextFunction, Request, Response } from "express"
import { ApiError } from "../errors/ApiError"
const router = express.Router()

const items = [1, 2, 3, 4, 5, 6]

router.get("/", (_, res) => {
  res.json({ items })
})

router.get("/:itemIndex", (req, res, next) => {
  const index = Number(req.params.itemIndex)
  const item = items[index]

  if (!item) {
    next(ApiError.resourceNotFound("Index out of boundary"))
    return
  }
  res.json({ item })
})

router.post("/", createItemHandler)

export default router

function createItemHandler(req: Request, res: Response, next: NextFunction) {
  const { item } = req.body

  // Check validation...
  if (!item) {
    next(ApiError.badRequest("Please, provide {item: number} as a property"))
    return
  }

  createItemService(item)

  res.json({ item })
}

function createItemService(item: number) {
  items.push(item)
}
