import { NextFunction, Request, Response } from "express"
import { ResponseHandler } from "../responses/ResponeHandler"
import { ApiError } from "../errors/ApiError"


  
export function responseHandler(
  rpHandler: typeof ResponseHandler | typeof ApiError | Error,
  req: Request,
  res: Response,
  __: NextFunction
){
  if(rpHandler instanceof ResponseHandler){
  if(!rpHandler.message){
    res.status(rpHandler.code).json({status: rpHandler.status, data: JSON.parse(rpHandler.data)})
    return

  }
  res.status(rpHandler.code).json({status: rpHandler.status, data: JSON.parse(rpHandler.data), message: rpHandler.message})
  return
}
if (rpHandler instanceof ApiError) {
  res.status(rpHandler.code).json({ status: 'Failure', msg: rpHandler.message })
  return
}

res.status(500).json({ msg: "Something went wrong" })

}

