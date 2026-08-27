import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
    console.log('✅ [POSTGRES] Supabase PostgreSQL connected!');
});

pool.on('error', (err) => {
    console.error('❌ [POSTGRES] Database error:', err.message);
});
