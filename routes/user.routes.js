import { Router } from "express";
import { getFavourites } from "../controllers/favourites.js";
const router = Router();

router.use("/getFavourite", getFavourites);
export default router;
