import { body, validationResult } from "express-validator";

export const validateRegisterUser = [
    body("name", "Name is required").notEmpty(),
    body("email", "Please provide a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
        min: 6,
    }),
];

export const validateLoginUser = [
    body("email", "Please provide a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
        min: 6,
    }),
];

export const validationMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    return res.send({
        "status": "error",
        "message": result.array()[0].msg,
        'stack': result.array()[0].path
    });
}