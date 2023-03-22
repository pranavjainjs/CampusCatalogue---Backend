import { Router } from 'express';

const router = Router();
import { createUser, userSignIn, signOut } from '../controllers/user';
import { isAuth } from '../middlewares/auth';
import { validateUserSignUp, userVlidation, validateUserSignIn } from '../middlewares/validation/user';

router.post('/create-user', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);


export default router;
