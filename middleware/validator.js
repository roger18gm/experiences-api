import { body, validationResult } from 'express-validator';

export const validateJob = [
    body('title').notEmpty().withMessage('Title is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('End date must be a valid date'),
    body('company').notEmpty().withMessage('Company name is required'),
    body('details').isArray({ min: 1 }).withMessage('Details array must not be empty'),
    body('location').notEmpty().withMessage('Location is required'),
];

export const validateJobPatch = [
    body('title').optional().notEmpty().withMessage('If provided, title cannot be empty'),
    body('startDate').optional().isISO8601().withMessage('Must be a valid date'),
    body('endDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('End date must be a valid date'),
    body('company').optional().notEmpty().withMessage('If provided, company cannot be empty'),
    body('details').optional().isArray({ min: 1 }).withMessage('Details array must not be empty'),
    body('location').optional().notEmpty().withMessage('If provided, location cannot be empty'),
];

export const validateProject = [
    body('name').notEmpty().withMessage('Name is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('End date must be a valid date'),
    body('sourceUrl').notEmpty().isURL().withMessage('Must be a valid URL'),
    body('type').notEmpty().withMessage('Project type is required'),
    body('details').isArray({ min: 1 }).withMessage('Details array must not be empty'),
    body('stack').isArray({ min: 1 }).withMessage('Tech stack must be a non-empty array'),
];

export const validateProjectPatch = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
    body('endDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('End date must be a valid date'),
    body('sourceUrl').optional({ nullable: true, checkFalsy: true }).isURL().withMessage('Must be a valid URL'),
    body('type').optional().notEmpty().withMessage('Project type is required'),
    body('details').optional().isArray({ min: 1 }).withMessage('Details array must not be empty'),
    body('stack').optional().isArray({ min: 1 }).withMessage('Tech stack must be a non-empty array'),
];

export const validateCertification = [
    body('name').notEmpty().withMessage('Name is required'),
    body('issuingOrganization').notEmpty().withMessage('Organization/entity name is required'),
    body('issueDate').isISO8601().withMessage('Issue date must be a valid date'),
    body('expireDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('Expire date must be a valid date'),
    body('verificationUrl').optional().optional({ nullable: true, checkFalsy: true }).isURL().withMessage('Must be a valid URL'),
    body('details').isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
];

export const validateCertificationPatch = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('issuingOrganization').optional().notEmpty().withMessage('Organization/entity name is required'),
    body('issueDate').optional().isISO8601().withMessage('Issue date must be a valid date'),
    body('expireDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('Expire date must be a valid date'),
    body('verificationUrl').optional().optional({ nullable: true, checkFalsy: true }).isURL().withMessage('Must be a valid URL'),
    body('details').optional().isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
];

export const validateOrganization = [
    body('name').notEmpty().withMessage('Name is required'),
    body('joinDate').isISO8601().withMessage('Join date must be a valid date'),
    body('leaveDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('Leave date must be a valid date'),
    body('type').notEmpty().withMessage('Organization type is required'),
    body('details').isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
];

export const validateOrganizationPatch = [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('joinDate').optional().isISO8601().withMessage('Join date must be a valid date'),
    body('leaveDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('Leave date must be a valid date'),
    body('type').optional().notEmpty().withMessage('Organization type is required'),
    body('details').optional().isString().isLength({ min: 10 }).withMessage('Details must be at least 10 characters'),
];

export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};