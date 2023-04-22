import { Router } from "express";
import {
  getOrdersByUserId,
  getOrdersByShopId,
  postOrder,
  updateApprovedStatus,
  updatePaymentStatus,
} from "../controllers/order.controller.js";

const router = Router();

// post requests
router.get("/getOrdersByUserId", getOrdersByUserId);
router.get("/getOrdersByShopId", getOrdersByShopId);

// post requests
router.post("/postOrder", postOrder);

// patch requests
router.post("/updateApprovedStatus", updateApprovedStatus);
router.post("/updatePaymentStatus", updatePaymentStatus);


// router.post("/getOrdersByUserId", getOrdersByUserId);

export default router;
