import { createNewProject, deleteProjectById, getAllProjects, getProjectById, updateProjectById } from '../controllers/projects.js';
import express from "express";
import { handleValidation, validateProject, validateProjectPatch } from '../middleware/validator.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// this is /projects because it is defined in the routes/index.js file
router.get("/", getAllProjects);

// then this will be /projects/:id
router.get("/:id", getProjectById);

router.post("/", isAuthenticated, validateProject, handleValidation, createNewProject);

router.put("/:id", isAuthenticated, validateProjectPatch, handleValidation, updateProjectById);

router.delete("/:id", isAuthenticated, deleteProjectById);

export default router;