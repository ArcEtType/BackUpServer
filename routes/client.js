import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getProducts,
  getAllCustomers,
  getCustomers,

  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getAllCustomers);
router.get("/customers/:id", getCustomers);
router.get("/stock", getTransactions);
router.get("/geography", getGeography);

export default router;
