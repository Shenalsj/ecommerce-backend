import mongoose from "mongoose";
import OrderDetailRepo from "../models/OrderDetail";
import { OrderDetail } from "../types/orderDetails";

async function getPaginatedOrderDetail(pageNumber: number, pageSize: number) {
  const skip = (pageNumber - 1) * pageSize;
  const orders = await OrderDetailRepo.find().skip(skip).limit(pageSize).exec();
  return orders;
}

async function findAll() {
  const orderDetails = await OrderDetailRepo.find().exec();

  return orderDetails;
}

async function findone(orderDetailId: string) {
  const id = new mongoose.Types.ObjectId(orderDetailId);
  const orderDetail = await OrderDetailRepo.findById(id).exec();

  return orderDetail;
}

async function createOne(orderDetail: OrderDetail) {
  const newOrderDetail = new OrderDetailRepo(orderDetail);
  return await newOrderDetail.save();
}

async function findOneAndUpdate(
  orderDetailId: string,
  orderDetail: OrderDetail
) {
  const id = new mongoose.Types.ObjectId(orderDetailId);
  return await OrderDetailRepo.findByIdAndUpdate(id, orderDetail, {
    new: true,
  });
}

async function findOneAndDelete(orderDetailId: string) {
  const id = new mongoose.Types.ObjectId(orderDetailId);
  return await OrderDetailRepo.findByIdAndDelete(id);
}

export default {
  findone,
  findAll,
  createOne,
  findOneAndUpdate,
  findOneAndDelete,
  getPaginatedOrderDetail,
};
