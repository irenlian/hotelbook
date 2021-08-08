import express from 'express';
import { getAllUsersController, getUserBookingsController, getUserController } from '../controllers/users';

const router = express.Router();
router.get('/users', getAllUsersController);
router.get('/users/:id', getUserController);
router.get('/users/:id/bookings', getUserBookingsController);

export default router;
