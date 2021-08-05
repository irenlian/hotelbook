import usersRoutes from './users';
import { Express } from 'express';

export default (app: Express) => {
  app.use(usersRoutes);
};
