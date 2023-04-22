import { Router } from "express";
import { addUser, getFavouritesItems } from "../controllers/user.controller.js";
import {
  getFavouriteShops,
  getUserInfo,
} from "../controllers/user.controller.js";

const router = Router();

// post requests
router.post("/addUser", addUser);

// get requests
router.get("/getFavouriteItems", getFavouritesItems);
router.get("/getUserInfo", getUserInfo);
router.get("/getFavouriteShops", getFavouriteShops);

export default router;
