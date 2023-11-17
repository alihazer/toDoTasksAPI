const globalErrorHandler = (err, req, res, next)=>{
    const stack = err?.stack.split('\n')[1];
    const message = err?.message;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    return res.status(statusCode).json({
        status: 'error',
        message,
        stack,
        
    });
}

// 404 error handler
export const notFoundErrorHandler = (req, res, next)=>{
    const error = new Error(`Not found The requested URL:  ${req.originalUrl}`);
    next(error);
}

export default globalErrorHandler;