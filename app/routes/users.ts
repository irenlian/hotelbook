import express from 'express';
import { getAllUsersController, getUserBookingsController, getUserController } from '../controllers/users';

const router = express.Router();
router.get('/user', getAllUsersController);
router.get('/user/:id', getUserController);
router.get('/user/:id/bookings', getUserBookingsController);

export default router;
