import { Router } from "express";
const router = Router();
import { createUser, userSignIn } from "../controllers/user.controller.js";
import {
  verifyCode,
  verifyJWT,
  renewJWT,
} from "../controllers/user.controller.js";
// import { createUser, userSignIn, signOut } from "../controllers/user.js";
// import { isAuth } from "../middlewares/auth.js";
// import {
//   validateUserSignUp,
//   userVlidation,
//   validateUserSignIn,
// } from "../middlewares/validation/user.js";

// router.post("/create-user", validateUserSignUp, userVlidation, createUser);
// router.post("/sign-in", validateUserSignIn, userVlidation, userSignIn);
// router.post("/sign-out", isAuth, signOut);
router.post("/", createUser);
router.post("/otp", verifyCode);
router.post("/jwt", verifyJWT);
router.post("/renew", renewJWT);
router.post("/signIn", userSignIn);

export default router;
