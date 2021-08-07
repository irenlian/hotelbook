import express from 'express';
import User from '../models/user';

export const getAllUsersController = async (req: express.Request, res: express.Response) => {
  try {
    res.send(await User.getAll());
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};

export const getUserController = async (req: express.Request, res: express.Response) => {
  try {
    const user = new User(parseInt(req.params.id, 10));
    res.send(await user.getUser());
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};
