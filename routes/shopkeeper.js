import { Router } from "express";
import {
  createUser,
  userSignIn,
  uploadProfile,
  signOut,
} from "../controllers/shopkeeper";
import { isAuth } from "../middlewares/auth";
import {
  validateUserSignUp,
  userVlidation,
  validateUserSignIn,
} from "../middlewares/validation/shopkeeper";

const router = Router();

// post requests
router.post("/create-user", validateUserSignUp, userVlidation, createUser);
router.post("/sign-in", validateUserSignIn, userVlidation, userSignIn);
router.post("/sign-out", isAuth, signOut);

export default router;
