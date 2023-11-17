import express from 'express';
import dotEnv from 'dotenv';
dotEnv.config();
import dbConnect  from '../config/dbConnection.js';
import userRoutes from '../routes/UserRoute.js';
import globalErrorHandler, { notFoundErrorHandler } from '../middlewares/globalErrorHandler.js';
dbConnect()

const app = express();
// body parser
app.use(express.json());
// routes
app.use('/api/v1/users', userRoutes);

// 404 error handler
app.use(notFoundErrorHandler);
// global error handler
app.use(globalErrorHandler)
export default app;