import express from "express";
import { getData } from "../controllers/index.js";
import projectsRouter from './projects.js';
import jobsRouter from './jobs.js';
import swaggerRouter from "./swagger.js";

const router = express.Router();

router.get("/", getData);
router.use("/projects", projectsRouter);
router.use("/jobs", jobsRouter);
router.use("/api-docs", swaggerRouter);


export default router;