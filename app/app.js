import express from 'express';
import dotEnv from 'dotenv';
dotEnv.config();
import dbConnect  from '../config/dbConnection.js';
import userRoutes from '../routes/UserRoute.js';
import globalErrorHandler, { notFoundErrorHandler } from '../middlewares/globalErrorHandler.js';
import taskRoutes from '../routes/TasksRoute.js';
dbConnect()

const app = express();
// body parser
app.use(express.json());
// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes)

// 404 error handler
app.use(notFoundErrorHandler);
// global error handler
app.use(globalErrorHandler)
export default app;