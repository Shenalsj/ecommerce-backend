import { NextFunction, Request, Response } from "express";
import ProductsService from "../services/productsService";
import { ApiError } from "../errors/ApiError";
import { Product } from "../types/products";

const ProductController = {
  async findAllProduct(req: Request, res: Response) {
    try {
      const pageNumber = Number(req.query.pageNumber) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const products = await ProductsService.paginateProducts(
        pageNumber,
        pageSize
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async findOneProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const product = await ProductsService.findOne(productId);

    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }

    res.json({ product });
  },

  async createOneProduct(req: Request, res: Response) {
    const newProduct: Product = req.body;
    const categoryId: string = req.body.categoryId;

    const product = await ProductsService.createOne(newProduct, categoryId);

    res.status(201).json({ product });
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const updatedProduct: Product = req.body;
    // const categoryId: string = req.body.categoryId;

    const product = await ProductsService.updateOne(
      productId,
      updatedProduct
      // categoryId
    );

    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }

    res.json({ product });
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const deletedProduct = await ProductsService.deleteOne(productId);

    if (!deletedProduct) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }

    res.json({ message: "Product deleted successfully" });
  },
};

export default ProductController;
