import mongoose, { Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}

const ProductSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  categoryId: {
    type: String,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model<Product>("Product", ProductSchema);
