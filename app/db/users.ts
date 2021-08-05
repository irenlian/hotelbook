import pool from "~/db/init";

export const getUser = async () => {
  const client = await pool.connect();
  const result = await client.query('SELECT * FROM test_table');
  client.release();
  return result;
}
