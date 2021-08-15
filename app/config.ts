require('dotenv').config();

export const database = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

export const domain = process.env.DOMAIN;
export const JWT = process.env.ACCESS_JWT_SECRET || 'secret';

export const port = process.env.PORT || 5000;
