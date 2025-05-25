import { createNewProject, deleteProjectById, getAllProjects, getProjectById, updateProjectById } from '../controllers/projects.js';
import express from "express";

const router = express.Router();

// this is /contacts because it is defined in the routes/index.js file
router.get("/", getAllProjects);

// then this will be /contacts/:id
router.get("/:id", getProjectById);

router.post("/", createNewProject);

router.put("/:id", updateProjectById);

router.delete("/:id", deleteProjectById);

export default router;