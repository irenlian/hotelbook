import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT } from '../config';

export const postUsers = async (req: express.Request, res: express.Response) => {
  const { name, email, password } = req.body;
  const result = await User.addUser({ name, email, password });
  if (result === 'username already exists' || result === 'invalid input') {
    res.statusCode = 400;
  }
  res.send({ validation: { body: { message: result } } });
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  if (!(await user.verifyUser())) {
    res.sendStatus(404);
  }
  const accessToken = jwt.sign({ email }, JWT, {
    expiresIn: 24 * 60 * 60 * 1000,
  });

  res.set('Jwt-Authorization', accessToken);
  res.sendStatus(200);
};

export const getAllUsersController = async (req: express.Request, res: express.Response) => {
  res.send(await User.getAll());
};

export const getUserController = async (req: express.Request, res: express.Response) => {
  const user = new User({ id: parseInt(req.params.id, 10) });
  res.send(await user.getUser());
};

export const getUserBookingsController = async (req: express.Request, res: express.Response) => {
  const user = new User({ id: parseInt(req.params.id, 10) });
  res.send(await user.getBookings());
};
