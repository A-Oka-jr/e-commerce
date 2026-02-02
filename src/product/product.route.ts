import { Router } from "express";
import productController from "./product.controller";

const router = Router();

router.post("/", productController.create);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;