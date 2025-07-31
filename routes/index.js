import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import projectsRouter from './projects.js';
import jobsRouter from './jobs.js';
import certificationsRouter from './certifications.js';
import organizationsRouter from './organizations.js';
import swaggerRouter from "./swagger.js";
import authRouter from './auth.js';
import usersRouter from './users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.use("/projects", projectsRouter);
router.use("/jobs", jobsRouter);
router.use("/certifications", certificationsRouter);
router.use("/organizations", organizationsRouter);
router.use("/api-docs", swaggerRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);


export default router;