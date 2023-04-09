import { Router } from "express";
import { getShop } from "../controllers/shop.js";
const router = Router();

router.get("/", getShop);
export default router;
