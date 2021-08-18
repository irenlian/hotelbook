import { Pool, PoolClient } from 'pg';
import { database } from '../config';

const pool = new Pool(database);

export const dbQuery = async (queryString: string, params?: any[]) => {
  if (!pool) throw new Error('No database connection');
  const client = await pool.connect();
  const result = await client.query(queryString, params);
  client.release();
  return result;
}

export default pool;
