import { Router } from "express";
import { getOrdersByUserId } from "../controllers/order.controller.js";

const router = Router();

router.post("/getOrders", getOrdersByUserId);

export default router;
