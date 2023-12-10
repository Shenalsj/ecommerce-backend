import { NextFunction, Request, Response } from "express";
import { z } from "zod"

import { requestSchema } from "../schemas/orderSchema";

export async function validateOrder(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        await requestSchema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        return next()
    } catch (error) {
        return res.status(400).json(error)
    }
}