import express from "express";
import { getUser } from '~/db/users';

const router = express.Router();
router.get('/db', async (req, res) => {
  console.log('Accessing /db');
  try {
    res.send(await getUser());
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

export default router;
