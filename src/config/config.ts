import * as dotenv from 'dotenv';

dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;

export const databaseConfig = {
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "user": process.env.DB_USER,
    "pass": process.env.DB_PASS,
    "db": process.env.DB_NAME,
};


export const jwtConfig = {
    "secret": process.env.JWT_SECRET || "no-secret",
}
