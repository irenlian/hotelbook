import express from 'express';
import { getAllUsersController, getUserBookingsController, getUserController, postUsers, login } from '../controllers/users';
import authenticate from "~/middlewares/authenticate";

const router = express.Router();
router.post('/user/signup', postUsers);
router.post('/user/login', login);

router.get('/user', getAllUsersController);
router.get('/user/:id', getUserController);
router.get('/user/:id/bookings', authenticate, getUserBookingsController);

export default router;
