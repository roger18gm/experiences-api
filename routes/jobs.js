import { createNewJob, deleteJobById, getAllJobs, getJobById, updateJobById } from '../controllers/jobs.js';
import express from "express";
import { handleValidation, validateJob, validateJobPatch } from '../middleware/validator.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// this is /jobs because it is defined in the routes/index.js file
router.get("/", getAllJobs);

// then this will be /jobs/:id
router.get("/:id", getJobById);

router.post("/", isAuthenticated, validateJob, handleValidation, createNewJob);

router.put("/:id", isAuthenticated, validateJobPatch, handleValidation, updateJobById);

router.delete("/:id", isAuthenticated, deleteJobById);

export default router;