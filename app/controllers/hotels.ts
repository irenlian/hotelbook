import express from 'express';
import User from '../models/user';
import Hotel from "~/models/hotel";

export const getAllHotelsController = async (req: express.Request, res: express.Response) => {
  res.send(await Hotel.getAll());
};

export const getHotelController = async (req: express.Request, res: express.Response) => {
  const hotel = new Hotel(parseInt(req.params.id, 10));
  res.send(await hotel.getHotel());
};

export const createBookingController = async (req: express.Request, res: express.Response) => {
  const user = new User(req.body.userId);
  res.send(await user.bookRoom({ roomId: req.body.roomId, checkIn: req.body.checkIn, checkOut: req.body.checkOut }));
};
