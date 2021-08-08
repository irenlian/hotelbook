import express from 'express';
import User from '../models/user';

export const getAllUsersController = async (req: express.Request, res: express.Response) => {
  res.send(await User.getAll());
};

export const getUserController = async (req: express.Request, res: express.Response) => {
  const user = new User(parseInt(req.params.id, 10));
  res.send(await user.getUser());
};
