import { Router } from "express";
import { addUser, getFavouritesItems } from "../controllers/user.controller.js";
import { getFavouriteShops } from "../controllers/user.controller.js";

const router = Router();

// post requests
router.post("/addUser", addUser);
router.get("/getFavouriteItems", getFavouritesItems);

// get requests
router.get("/getFavouriteShops", getFavouriteShops);

export default router;
