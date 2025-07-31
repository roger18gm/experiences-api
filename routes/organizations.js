import { createNewOrganization, deleteOrganizationById, getAllOrganizations, getOrganizationById, updateOrganizationById } from '../controllers/organizations.js';
import express from "express";
import { handleValidation, validateOrganization, validateOrganizationPatch } from '../middleware/validator.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// this is /projects because it is defined in the routes/index.js file
router.get("/", getAllOrganizations);

// then this will be /projects/:id
router.get("/:id", getOrganizationById);

router.post("/", isAuthenticated, validateOrganization, handleValidation, createNewOrganization);

router.put("/:id", isAuthenticated, validateOrganizationPatch, handleValidation, updateOrganizationById);

router.delete("/:id", isAuthenticated, deleteOrganizationById);

export default router;