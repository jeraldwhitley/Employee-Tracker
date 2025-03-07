//Imports dependencies like pg, dotenv for applicatioon
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

//Creates a new Pool object to store environmental variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
