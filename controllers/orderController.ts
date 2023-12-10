import express, { NextFunction, Request, Response } from "express";
import OrderService from "../services/orderService"
import { ApiError } from "../errors/ApiError";
import { ResponseHandler } from "../responses/ResponeHandler";


const OrderController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const list = await OrderService.findAll()
    //res.json({ list });
    next(ResponseHandler.resourceFetched(JSON.stringify(list)))
  }
  ,
  async getAllOffset(req: Request, res: Response, next:NextFunction) {
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    if(pageNumber<0){
      next(ApiError.internal("PageNumber Must be Non Negative"))
      return
    }
    const list = await OrderService.getPaginatedOrder(pageNumber, pageSize)
    //res.json({ list });
    next(ResponseHandler.resourceFetched(JSON.stringify(list)))

  }
  ,
  async getAllUserOrdersOffset(req: Request, res: Response, next:NextFunction) {
    const userId = req.params.id
    if(userId.length!==24){
      next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
      return
    }
    const pageNumber = Number(req.query.pageNumber) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    if(pageNumber<0){
      next(ApiError.internal("PageNumber Must be Non Negative"))
      return
    }

    const list = await OrderService.getPaginatedUserOrder(userId, pageNumber, pageSize)
    //res.json({ list });
    next(ResponseHandler.resourceFetched(JSON.stringify(list)))

  }
,
  async getAllUserOrders(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id
    if(userId.length!==24){
      next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
      return
    }
    const list = await OrderService.findAllForUser(userId)
    //res.json({ list });
    next(ResponseHandler.resourceFetched(JSON.stringify(list)))

  }
,
  async getOrder(req: Request, res: Response, next:NextFunction) {
    const orderId = req.params.id;
    if(orderId.length!==24){
      next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
      return
    }
    const item = await OrderService.findOne(orderId)
    if (!item) {
      next(ApiError.resourceNotFound(`OrderId ${orderId} is not found`))
    } 
    next(ResponseHandler.resourceFetched(JSON.stringify(item)))

  }
  ,
  async createOrder(req: Request, res: Response, next: NextFunction) {
    const order = req.body;
    if(!order){
      next(ApiError.internal("Details are Required"))
      return
    }
    const newOrder = await OrderService.createOne(order)
    next(ResponseHandler.resourceCreated(JSON.stringify(newOrder), `Order with ${newOrder._id} has been added`))
  }
  ,
  async updateOrder(req: Request, res: Response, next:NextFunction) {
    const orderId = req.params.id;
    if(orderId.length!==24){
      next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
      return
    }
    const  updatedOrder  = req.body;
    if(!updatedOrder){
      next(ApiError.internal("Details are Required"))
      return
    }
    const order = await OrderService.updateOne(orderId, updatedOrder);
    if(!order){
      next(ApiError.resourceNotFound("Order not found"))
      return
    }
    next(ResponseHandler.resourceUpdated(JSON.stringify(order), `Order with ${order._id} has been updated`))
  }
  ,
  async deleteOrder(req: Request, res: Response, next:NextFunction) {
    const orderId = req.params.id;
    if(orderId.length!==24){
      next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"))
      return
    }
    const order = await OrderService.deleteOne(orderId);
    if(!order){
      next(ApiError.resourceNotFound("Order not found"))
      return
    }
    next(ResponseHandler.resourceDeleted(JSON.stringify(order), `Order with ${order._id} has been deleted`))

  }
}

export default OrderController;