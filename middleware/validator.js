import { body, validationResult } from 'express-validator';

export const validateJob = [
    body('title').notEmpty().withMessage('Title is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
    body('company').notEmpty().withMessage('Company name is required'),
    body('details').isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
];

export const validateJobPatch = [
    body('title').optional().notEmpty().withMessage('If provided, title cannot be empty'),
    body('startDate').optional().isISO8601().withMessage('Must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('Must be a valid date'),
    body('company').optional().notEmpty().withMessage('If provided, company cannot be empty'),
    body('details').optional().isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
];

export const validateProject = [
    body('name').notEmpty().withMessage('Name is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
    body('url').notEmpty().withMessage('URL is required.'),
    body('type').notEmpty().withMessage('Project type is required'),
    body('details').isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
    body('stack').isArray({ min: 1 }).withMessage('Tech stack must be a non-empty array'),
];

export const validateProjectPatch = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
    body('url').optional().notEmpty().withMessage('URL is required.'),
    body('type').optional().notEmpty().withMessage('Project type is required'),
    body('details').optional().isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
    body('stack').optional().isArray({ min: 1 }).withMessage('Tech stack must be a non-empty array'),
];


export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};