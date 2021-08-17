import express from 'express';
import User from '../models/user';
import Hotel, { FiltersType } from '../models/hotel';

export const getAllHotelsController = async (req: express.Request, res: express.Response) => {
  const filters: FiltersType = req.query as unknown as FiltersType;
  if ((filters.from && !filters.to) || (!filters.from && filters.to)) return res.sendStatus(400);
  res.send(await Hotel.getAll(filters));
};

export const getHotelController = async (req: express.Request, res: express.Response) => {
  const hotel = new Hotel(parseInt(req.params.id, 10));
  res.send(await hotel.getHotel());
};

export const getHotelBookingsController = async (req: express.Request, res: express.Response) => {
  const hotel = new Hotel(parseInt(req.params.id, 10));
  res.send(await hotel.getBookings());
};

export const createBookingController = async (req: express.Request, res: express.Response) => {
  const token = req.header('Jwt-Authorization') as string;
  const user = await User.getUserByToken(token);
  if (!user) return res.sendStatus(400);

  res.send(await user.bookRoom({ roomId: req.body.roomId, checkIn: req.body.checkIn, checkOut: req.body.checkOut }));
};
