import express from 'express';
import { celebrate } from 'celebrate';
import {
  getAllUsersController,
  getUserBookingsController,
  getUserController,
  postUsers,
  login,
} from '../controllers/users';
import authenticate from '../middlewares/authenticate';
import userSchema from '../schemas/user';

const router = express.Router();
router.post('/user/signup', celebrate(userSchema), postUsers);
router.post('/user/login', celebrate(userSchema), login);

router.get('/user', getAllUsersController);
router.get('/user/:id', getUserController);
router.get('/user/:id/bookings', authenticate, getUserBookingsController);

export default router;
