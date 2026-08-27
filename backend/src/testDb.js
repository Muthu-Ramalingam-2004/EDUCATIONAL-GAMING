import { pool } from './services/dbConnection.js';

try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ DATABASE TEST SUCCESS:', result.rows[0]);
} catch (error) {
    console.error('❌ DATABASE TEST FAILED:', error.message);
} finally {
    await pool.end();
}
