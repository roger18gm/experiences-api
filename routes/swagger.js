import express from "express";
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';

const router = express.Router();
const swaggerDocument = JSON.parse(readFileSync(new URL('../swagger-output.json', import.meta.url)));

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;