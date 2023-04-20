import { Router } from "express";
import { getAllItems, getItemById } from "../controllers/item.controller.js";

const router = Router();

router.get("/allItems", getAllItems);
router.get("/getItemById", getItemById);

export default router;
