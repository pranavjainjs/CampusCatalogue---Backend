import { Router } from "express";
import { getFavourites } from "../controllers/favourites.controller.js";
import { addUser } from "../controllers/user.controller.js";
const router = Router();

router.get("/getFavourite", getFavourites);
router.post("/addUser", addUser);
export default router;
