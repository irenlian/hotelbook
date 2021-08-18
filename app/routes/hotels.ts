import express from 'express';
import { celebrate } from 'celebrate';
import {
  createBookingController,
  getAllHotelsController,
  getHotelController,
  getHotelBookingsController,
} from '../controllers/hotels';
import authenticate from '../middlewares/authenticate';
import allHotelsSchema from '../schemas/allHotels';
import bookingSchema from '../schemas/booking';

const router = express.Router();
router.get('/hotel', celebrate(allHotelsSchema), getAllHotelsController);
router.get('/hotel/:id', getHotelController);
router.get('/hotel/:id/booking', getHotelBookingsController);
router.put('/hotel/room/:id/booking', celebrate(bookingSchema), authenticate, createBookingController);

export default router;
