import { Router } from "express";
import { getAllShops, getShopById } from "../controllers/shop.controller.js";
const router = Router();

router.get("/allShops", getAllShops);
router.get("/:id", getShopById);
export default router;
