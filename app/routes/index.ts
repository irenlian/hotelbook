import usersRoutes from './users';
import hotelsRoutes from './hotels';
import { Express } from 'express';

export default (app: Express) => {
  app.use(usersRoutes);
  app.use(hotelsRoutes);
};
