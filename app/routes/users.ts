import express from 'express';
import { getAllUsersController, getUserController } from '../controllers/users';

const router = express.Router();
router.get('/users', getAllUsersController);
router.get('/users/:id', getUserController);

export default router;
