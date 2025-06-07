import { createNewCertification, deleteCertificationById, getAllCertifications, getCertificationById, updateCertificationById } from '../controllers/certifications.js';
import express from "express";
import { handleValidation, validateCertification, validateCertificationPatch, } from '../middleware/validator.js';

const router = express.Router();

// this is /projects because it is defined in the routes/index.js file
router.get("/", getAllCertifications);

// then this will be /projects/:id
router.get("/:id", getCertificationById);

router.post("/", validateCertification, handleValidation, createNewCertification);

router.put("/:id", validateCertificationPatch, handleValidation, updateCertificationById);

router.delete("/:id", deleteCertificationById);

export default router;