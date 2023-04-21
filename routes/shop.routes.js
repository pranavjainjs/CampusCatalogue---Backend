import { Router } from "express";
import {
  postShop,
  getAllShops,
  getAllShopItems,
  getShopById,
} from "../controllers/shop.controller.js";
const router = Router();

// get requests
router.get("/", (req, res) => {
  res.send("hello world");
});
router.get("/allShops", getAllShops);
router.get("/getShopById", getShopById);
router.get("/getAllShopItems", getAllShopItems);

// post requests
router.post("/postShop", postShop);

export default router;
