import { Router } from "express";
import { addUser, getFavouritesItems } from "../controllers/user.controller.js";
const router = Router();

// get requests
router.get("/getFavouriteItems", getFavouritesItems);

// post requests
router.post("/addUser", addUser);

export default router;
