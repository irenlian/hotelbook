import usersRoutes from './users';
import hotelsRoutes from './hotels';
import { Express } from 'express';

export default (app: Express) => {
  app.use('/api/v1', usersRoutes);
  app.use('/api/v1', hotelsRoutes);
};
