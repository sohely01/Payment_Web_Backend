import { body, validationResult } from 'express-validator';

export const sanitizeUserInput = [
    // Validate and sanitize 'id' if present
    body('id').optional().isInt({ min: 1 }).withMessage('ID must be a positive integer').toInt(),

    // Validate and sanitize 'heading' if present
    body('heading').optional().trim().escape().isLength({ min: 3 }).withMessage('Heading must be at least 3 characters long'),

    // Validate and sanitize 'description' if present
    body('description').optional().trim().escape().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),

    // Final error handler
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send().json({
                status: "error",
                message: "Sanitizing error",
                errors: errors.array()
            });
        }
        next();
    }
];
