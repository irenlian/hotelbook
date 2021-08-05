import pool from "./init";

export const getUser = async () => {
  if (!pool) throw new Error('No database connection');
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM test_table');
  client.release();
  return result;
}
