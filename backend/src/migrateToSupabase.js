import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { pool } from './services/dbConnection.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_PATH = path.resolve(__dirname, 'data/usersStore.json');

async function migrate() {
    try {
        console.log('🚀 Starting Supabase migration...');

        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        const data = JSON.parse(raw);

        const users = data.users || [];
        const students = data.students || {};

        console.log(`👥 Found ${users.length} users`);
        console.log(`🎓 Found ${Object.keys(students).length} students`);

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Old user ID → new UUID mapping
            const idMap = new Map();

            // Migrate users
            for (const user of users) {
                const newId = randomUUID();
                idMap.set(user.id, newId);

                await client.query(
                    `INSERT INTO users
            (id, email, password_hash, role, created_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (email) DO NOTHING`,
                    [
                        newId,
                        user.email,
                        user.password_hash,
                        user.role || 'student',
                        user.createdAt || new Date().toISOString()
                    ]
                );

                console.log(`✅ User migrated: ${user.email}`);
            }

            // Migrate students
            for (const [oldStudentId, student] of Object.entries(students)) {
                const newStudentId = idMap.get(oldStudentId);

                if (!newStudentId) {
                    console.warn(`⚠️ No user mapping for student: ${oldStudentId}`);
                    continue;
                }

                await client.query(
                    `INSERT INTO students
            (
              id,
              name,
              username,
              avatar,
              class_standard,
              level,
              total_xp,
              next_level_xp,
              coins,
              streak_days,
              games_played,
              questions_solved,
              accuracy_pct,
              best_score,
              email,
              current_world_id,
              current_world_name,
              recent_badge,
              created_at
            )
           VALUES
            (
              $1, $2, $3, $4, $5, $6, $7, $8, $9,
              $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
            )
           ON CONFLICT (id) DO NOTHING`,
                    [
                        newStudentId,
                        student.name || 'New Student',
                        student.username || null,
                        student.avatar || '⚡',
                        Number(student.classStandard) || 9,
                        Number(student.level) || 1,
                        Number(student.totalXp) || 0,
                        Number(student.nextLevelXp) || 500,
                        Number(student.coins) || 0,
                        Number(student.streakDays) || 1,
                        Number(student.gamesPlayed) || 0,
                        Number(student.questionsSolved) || 0,
                        Number(student.accuracyPct) || 100,
                        Number(student.bestScore) || 0,
                        student.email || null,
                        student.currentWorldId || null,
                        student.currentWorldName || null,
                        student.recentBadge || null,
                        student.createdAt || new Date().toISOString()
                    ]
                );

                console.log(`✅ Student migrated: ${student.email || student.name}`);
            }

            await client.query('COMMIT');

            console.log('\n========================================');
            console.log('🎉 MIGRATION SUCCESSFUL');
            console.log(`👥 Users migrated: ${users.length}`);
            console.log(`🎓 Students migrated: ${Object.keys(students).length}`);
            console.log('========================================\n');

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('\n❌ MIGRATION FAILED');
        console.error(error.message);
        console.error(error.stack);
    } finally {
        await pool.end();
    }
}

migrate();
