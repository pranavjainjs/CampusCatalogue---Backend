import { Router } from "express";
import { getShopById } from "../controllers/shop.controller.js";
const router = Router();

router.get("/:id", getShopById);
export default router;
