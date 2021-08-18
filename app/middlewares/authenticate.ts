import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT } from '../config';

export default async (req: express.Request, res: express.Response, next: Function): Promise<express.Response | void> => {
  try {
    const token = req.header('Jwt-Authorization');
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      jwt.verify(token, JWT);
    } catch (e) {
      return res.sendStatus(401);
    }
    return await next();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};
