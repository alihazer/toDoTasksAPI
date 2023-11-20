import express from 'express';
import { registerUser, loginUser, getUserProfile, getAllUsers, deleteUser, addNewAdmin, editUserProfile, logoutUser } from '../controllers/UserCtrl.js';
import { validateRegisterUser, validationMiddleware } from '../middlewares/validationMiddleware.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { isAdmin } from '../middlewares/isAdmin.js';
const router  = express.Router();



router.post('/register', validateRegisterUser, validationMiddleware , registerUser);
router.post('/login', loginUser);
router.post('/logout', isLoggedIn, logoutUser);
router.get('/profile', isLoggedIn,  getUserProfile);
router.put('/editProfile', isLoggedIn, editUserProfile );
router.delete('/delete/:id', isLoggedIn, isAdmin, deleteUser);
router.get('/all', isLoggedIn ,isAdmin, getAllUsers);
router.post('/addAdmin/:id', isLoggedIn, isAdmin, addNewAdmin);


export default router;