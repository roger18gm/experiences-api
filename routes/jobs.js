import { createNewJob, deleteJobById, getAllJobs, getJobById, updateJobById } from '../controllers/jobs.js';
import express from "express";

const router = express.Router();

// this is /contacts because it is defined in the routes/index.js file
router.get("/", getAllJobs);

// then this will be /contacts/:id
router.get("/:id", getJobById);

router.post("/", createNewJob);

router.put("/:id", updateJobById);

router.delete("/:id", deleteJobById);

export default router;