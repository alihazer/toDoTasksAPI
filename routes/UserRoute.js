import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/UserCtrl.js';
import { validateRegisterUser, validationMiddleware } from '../middlewares/validationMiddleware.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const router  = express.Router();

router.post('/register', validateRegisterUser, validationMiddleware ,registerUser);
router.post('/login', loginUser);
router.get('/profile', isLoggedIn,  getUserProfile);


export default router;