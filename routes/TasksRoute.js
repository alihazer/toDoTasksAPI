import express from 'express';
import { createTask, editTask, deleteTask, getUserTasks } from '../controllers/TasksCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const router  = express.Router();

router.post('/create', isLoggedIn, createTask);
router.put('/edit/:id', isLoggedIn, editTask);
router.delete('/delete/:id', isLoggedIn, deleteTask);;
router.get('/all', isLoggedIn, getUserTasks);

export default router;