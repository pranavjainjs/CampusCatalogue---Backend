import { Router } from "express";
import { getFavourites } from "../controllers/favourites.controller.js";
import { addUser } from "../controllers/user.controller.js";
const router = Router();

router.use("/getFavourite", getFavourites);
router.get("/addUser", addUser);  // not working
export default router;
