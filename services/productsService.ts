import ProductRepo from "../models/Product";
import { Product } from "../types/products";

async function paginateProducts(pageNumber: number, pageSize: number) {
  const skip = (pageNumber - 1) * pageSize;
  // const products = await ProductRepo.find().skip(skip).limit(pageSize).populate('categoryId').exec();
  const products = await ProductRepo.find().skip(skip).limit(pageSize).exec();
  return products;
}

async function findAll() {
  const products = await ProductRepo.find().populate("categoryId").exec();
  return products;
}

async function findOne(productId: string) {
  const product = await ProductRepo.findById(productId)
    .populate("categoryId")
    .exec();
  return product;
}

async function createOne(product: Product, categoryId: string) {
  product.categoryId = categoryId;
  const newProduct = new ProductRepo(product);
  return await newProduct.save();
}

async function updateOne(
  productId: string,
  updatedProduct: Product
  // categoryId: string
) {
  // updatedProduct.categoryId = categoryId;
  const product = await ProductRepo.findByIdAndUpdate(
    productId,
    updatedProduct,
    { new: true }
  );
  // .populate("categoryId")
  // .exec();
  return product;
}

async function deleteOne(productId: string) {
  const product = await ProductRepo.findByIdAndDelete(productId);
  // .populate("categoryId")
  // .exec();
  return product;
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  paginateProducts,
};
