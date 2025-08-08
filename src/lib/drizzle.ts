import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await pool.end();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    throw error;
  }
};
