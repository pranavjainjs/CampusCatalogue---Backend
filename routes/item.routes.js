import { Router } from "express";
import {
  getAllItems,
  getItemById,
  postItem,
} from "../controllers/item.controller.js";

const router = Router();

// get request
router.get("/allItems", getAllItems);
router.get("/getItemById", getItemById);


// post request
router.post("/postItem", postItem);

export default router;
