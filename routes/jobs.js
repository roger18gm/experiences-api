import { createNewJob, deleteJobById, getAllJobs, getJobById, updateJobById } from '../controllers/jobs.js';
import express from "express";
import { handleValidation, validateJob, validateJobPatch } from '../middleware/validator.js';

const router = express.Router();

// this is /jobs because it is defined in the routes/index.js file
router.get("/", getAllJobs);

// then this will be /jobs/:id
router.get("/:id", getJobById);

router.post("/", validateJob, handleValidation, createNewJob);

router.put("/:id", validateJobPatch, handleValidation, updateJobById);

router.delete("/:id", deleteJobById);

export default router;