import { Router } from "express";
import { getFavourites } from "../controllers/favourites.js";
const router = Router();

router.get("/", getFavourites);
export default router;
