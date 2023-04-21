import { Router } from "express";
import { addUser, getFavouritesItems } from "../controllers/user.controller.js";
const router = Router();
import { getFavouriteShops } from "../controllers/user.controller.js";
// post requests
router.post("/addUser", addUser);
router.get("/getFavouriteItems", getFavouritesItems);

router.get("/getFavouriteShops", getFavouriteShops);
export default router;
