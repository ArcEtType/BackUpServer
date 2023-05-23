import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,

} from "../controllers/products.js";
//import { verifyToken } from "../middleware/auth.js";

const router = express.Router();



router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/create', createProduct);
router.put("/:id", updateProduct);
router.delete('/:id', deleteProduct);

export default router;