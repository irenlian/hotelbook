import { dbQuery } from './init';

export const getAllUsers = () => dbQuery('SELECT * FROM users');

export const insertUser = (name: string, email: string, password: string) => dbQuery(`INSERT INTO users (name, email, password) VALUES(${name}, ${email}, ${password})`);

export const getUser = (id: number) => dbQuery(`SELECT * FROM users WHERE id=${id}`);

export const getUserByEmail = (email: string) => dbQuery(`SELECT * FROM users WHERE email=${email}`);
