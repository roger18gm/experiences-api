import { createNewCertification, deleteCertificationById, getAllCertifications, getCertificationById, updateCertificationById } from '../controllers/certifications.js';
import express from "express";
import { handleValidation, validateCertification, validateCertificationPatch, } from '../middleware/validator.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// this is /projects because it is defined in the routes/index.js file
router.get("/", getAllCertifications);

// then this will be /projects/:id
router.get("/:id", getCertificationById);

router.post("/", isAuthenticated, validateCertification, handleValidation, createNewCertification);

router.put("/:id", isAuthenticated, validateCertificationPatch, handleValidation, updateCertificationById);

router.delete("/:id", isAuthenticated, deleteCertificationById);

export default router;