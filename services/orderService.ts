import mongoose, { ObjectId } from "mongoose";
import OrderRepo from "../models/Order";
import { Order } from "../types/order";

async function getPaginatedOrder(pageNumber: number, pageSize: number) {
  const orders = await OrderRepo.find().skip(pageNumber).limit(pageSize).exec();

  return orders;
}

async function getPaginatedUserOrder(
  userId: string,
  pageNumber: number,
  pageSize: number
) {
  const orders = await OrderRepo.find({ userId })
    .skip(pageNumber)
    .limit(pageSize)
    .exec();
  return orders;
}

async function findAll() {
  const orders = await OrderRepo.find().exec();

  return orders;
}

async function findAllForUser(userId: string) {
  const orders = await OrderRepo.find({ userId }).exec();

  return orders;
}

async function findOne(orderId: string) {
  const oid = new mongoose.Types.ObjectId(orderId);

  const category = await OrderRepo.findById(oid).exec();

  return category;
}

async function createOne(order: Order) {
  const newOrder = new OrderRepo(order);
  return await newOrder.save();
}

async function updateOne(orderId: string, updatedOrder: Order) {
  const id = new mongoose.Types.ObjectId(orderId);
  const order = await OrderRepo.findById(id);

  return await OrderRepo.findByIdAndUpdate(id, updatedOrder, {
    new: true,
  });
}

async function deleteOne(orderId: string) {
  const id = new mongoose.Types.ObjectId(orderId);
  return await OrderRepo.findByIdAndDelete(id, {
    new: true,
  });
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  findAllForUser,
  getPaginatedOrder,
  getPaginatedUserOrder,
};
