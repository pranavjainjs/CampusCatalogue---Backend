import { Router } from "express";
import {
  postShop,
  getAllShops,
  getShopById,
} from "../controllers/shop.controller.js";
const router = Router();

router.post("/postShop", postShop);

router.get("/allShops", getAllShops);
router.get("/:id", getShopById);


export default router;
