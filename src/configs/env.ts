import dotenv from 'dotenv';

dotenv.config(); // env variable parseing

export const port: number = Number(process.env.PORT) || 4000;
export const databaseUrl: string = process.env.DB_URL || '';
export const mode: string = process.env.NODE_ENV || 'development';
