require('dotenv').config();

export const database = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

export const domain = process.env.DOMAIN;

export const port = process.env.PORT || 5000;
