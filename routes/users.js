import express from 'express';
import { getAllUsers } from "../controllers/users.js";
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getAllUsers);


export default router;  