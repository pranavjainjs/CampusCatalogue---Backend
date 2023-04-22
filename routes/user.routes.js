import { Router } from "express";
import {
  addUser,
  getFavouritesItems,
  getUser,
  getUserInfo
} from "../controllers/user.controller.js";
import { getFavouriteShops } from "../controllers/user.controller.js";
import { getAllSOrders } from "../fakerjs/dummy.js";

const router = Router();

// post requests
router.post("/addUser", addUser);

// get requests
router.get("/getUser", getUser);
router.get("/getFavouriteItems", getFavouritesItems);
router.get("/getUserInfo", getUserInfo);
router.get("/getFavouriteShops", getFavouriteShops);


export default router;
