import express from 'express';
import User from '../models/user';

export const createBookingController = async (req: express.Request, res: express.Response) => {
  try {
    const user = new User(req.body.userId);
    res.send(await user.bookRoom({ roomId: req.body.roomId, checkIn: req.body.checkIn, checkOut: req.body.checkOut }));
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};
