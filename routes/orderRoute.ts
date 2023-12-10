import { Router } from "express";

import OrderController from "../controllers/orderController";

const router = Router();

router.post("/", OrderController.createOrder);
router.get("/user/:id", OrderController.getAllUserOrders);
router.get("/offset", OrderController.getAllOffset);
router.get("/user/:id/offset", OrderController.getAllUserOrdersOffset);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getOrder);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

router.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Record created:", {
      req,
      /* log data */
    });
  });
  next();
});

export default router;
