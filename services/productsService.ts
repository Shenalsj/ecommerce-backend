import ProductRepo from "../models/Product";
import { Product } from "../types/products";

async function paginateProducts(pageNumber: number, pageSize: number) {
  const skip = (pageNumber - 1) * pageSize;

  const products = await ProductRepo.find().skip(skip).limit(pageSize).exec();
  return products;
}

async function findAll() {
  const products = await ProductRepo.find();
  return products;
}

async function findOne(productId: string) {
  const product = await ProductRepo.findById(productId);

  return product;
}

async function createOne(product: Product, categoryId: string) {
  product.categoryId = categoryId;
  const newProduct = new ProductRepo(product);
  return await newProduct.save();
}

async function updateOne(productId: string, updatedProduct: Product) {
  const product = await ProductRepo.findByIdAndUpdate(
    productId,
    updatedProduct,
    { new: true }
  );

  return product;
}

async function deleteOne(productId: string) {
  const product = await ProductRepo.findByIdAndDelete(productId);

  return product;
}

async function findProductByTitle(title: string) {
  const products = await ProductRepo.find();
  const filteredProducts: any = products.filter((product) => {
    return product.name.toLowerCase().startsWith(title.toLowerCase());
  });
  return filteredProducts;
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  paginateProducts,
  findProductByTitle,
};
