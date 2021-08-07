import { Pool, PoolClient } from 'pg';
import { database } from '../config';

const pool = new Pool(database);

type DBFunction = (client: PoolClient) => Promise<any>;

export const dbQuery = (callback: DBFunction) => async () => {
  if (!pool) throw new Error('No database connection');
  const client = await pool.connect();
  const result = await callback(client);
  client.release();
  return result;
};

export default pool;
