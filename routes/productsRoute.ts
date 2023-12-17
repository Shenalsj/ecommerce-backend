import express from "express";
import ProductController from "../controllers/productsController";
import { validateProduct } from "../middlewares/productValidate";

const router = express.Router();

router.get("/", ProductController.findAllProduct);
router.get("/:title", ProductController.findProductByTitle);
router.get("/get/:productId", ProductController.findOneProduct);
router.post("/", validateProduct, ProductController.createOneProduct);
router.put("/:productId", ProductController.updateProduct);
router.delete("/:productId", ProductController.deleteProduct);

export default router;
