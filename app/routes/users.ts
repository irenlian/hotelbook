import express from "express";
import { getUsers } from '../db/users';

const router = express.Router();
router.get('/db', async (req, res) => {
  try {
    res.send(await getUsers());
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

export default router;
