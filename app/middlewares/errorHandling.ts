import express from "express";

export default async (req: express.Request, res: express.Response, next: Function): Promise<void> => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
};
