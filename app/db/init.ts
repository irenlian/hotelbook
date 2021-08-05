import { Pool } from 'pg';

let pool: Pool | null = null;

export const initDB = () => {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

export default pool;
