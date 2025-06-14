import path from "path";
import { fileURLToPath } from 'url';
import express from "express";
import projectsRouter from './projects.js';
import jobsRouter from './jobs.js';
import certificationsRouter from './certifications.js';
import organizationsRouter from './organizations.js';
import swaggerRouter from "./swagger.js";
import authRouter from './auth.js';
import { ensureAuth, ensureGuest } from "../middleware/auth.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.use("/projects", ensureAuth, projectsRouter);
router.use("/jobs", ensureAuth, jobsRouter);
router.use("/certifications", ensureAuth, certificationsRouter);
router.use("/organizations", ensureAuth, organizationsRouter);
router.use("/api-docs", ensureAuth, swaggerRouter);
router.use("/auth", ensureGuest, authRouter);


export default router;