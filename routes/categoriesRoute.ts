import { Router } from 'express';

import  CategoryController  from '../controllers/categoryController';


const router = Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);
router.get("/offset/", CategoryController.getOffset);
router.get('/:id', CategoryController.getCategoryById);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id",CategoryController.deleteCategory);
/*
router.use((req, res, next) => {
  console.log("👀 got here")
  res.on("finish", () => {
    console.log("Record created:", {
    //   log data 
    })
  })
  next()
})
*/
export default router;
