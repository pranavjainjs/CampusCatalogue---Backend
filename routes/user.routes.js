import { Router } from "express";
import {
  addUser,
  getFavouritesItems,
  getUser,
} from "../controllers/user.controller.js";
import { getFavouriteShops } from "../controllers/user.controller.js";

const router = Router();

// post requests
router.post("/addUser", addUser);
router.get("/getUser", getUser);

// get requests
router.get("/getFavouriteItems", getFavouritesItems);
router.get("/getUserInfo", getUserInfo);
router.get("/getFavouriteShops", getFavouriteShops);

export default router;
