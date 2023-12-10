import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OrderDetailSchema = new Schema({
  orderId: {
    type: ObjectId,
    ref: "Order",
    required: true,
  },
  productId: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceAtPurchase: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("OrderDetail", OrderDetailSchema);
