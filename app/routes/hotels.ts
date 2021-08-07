import express from 'express';
import { createBookingController } from '../controllers/hotels';

const router = express.Router();
router.put('/hotels/rooms/:id/bookings', createBookingController);

export default router;
