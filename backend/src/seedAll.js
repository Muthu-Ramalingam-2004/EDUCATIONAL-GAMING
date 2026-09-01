import { pool } from './services/dbConnection.js';
import { initialQuestionsData } from './data/initialQuestions.js';

async function seedAllFast() {
  console.log(`🚀 Fast Batch Seeding ${initialQuestionsData.length} total questions...`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const q of initialQuestionsData) {
      const classStandard = Number(q.classStandard) || 9;
      const subjectId = (q.subjectId || 'maths').toLowerCase();
      const chapId = q.chapterId || `class${classStandard}_world1`;
      const topicId = q.topicId || 'number_systems';

      await client.query(
        `INSERT INTO chapters (id, class_standard, subject_id, title) 
         VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`,
        [chapId, classStandard, subjectId, q.chapterName || chapId]
      );

      await client.query(
        `INSERT INTO topics (id, chapter_id, subject_id, class_standard, title) 
         VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING`,
        [topicId, chapId, subjectId, classStandard, q.topicName || topicId]
      );

      await client.query(
        `INSERT INTO questions (id, chapter_id, topic_id, subject_id, class_standard, level_number, question_type, question_text, explanation, difficulty, xp_reward, coins_reward) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
         ON CONFLICT (id) DO UPDATE SET 
           question_text = EXCLUDED.question_text, 
           class_standard = EXCLUDED.class_standard, 
           subject_id = EXCLUDED.subject_id, 
           level_number = EXCLUDED.level_number`,
        [
          q.id,
          chapId,
          topicId,
          subjectId,
          classStandard,
          Number(q.levelNumber) || 1,
          q.questionType || 'quiz',
          q.questionText,
          q.explanation || '',
          q.difficulty || 'Medium',
          Number(q.xpReward) || 50,
          Number(q.coinsReward) || 20
        ]
      );

      if (Array.isArray(q.options) && q.options.length > 0) {
        await client.query('DELETE FROM question_options WHERE question_id = $1', [q.id]);
        for (const opt of q.options) {
          await client.query(
            `INSERT INTO question_options (question_id, option_key, option_text, is_correct) 
             VALUES ($1, $2, $3, $4)`,
            [q.id, opt.id, opt.text, !!opt.isCorrect]
          );
        }
      }
    }

    await client.query('COMMIT');
    console.log('✅ ALL QUESTIONS & OPTIONS FAST BATCH SEEDED SUCCESSFULLY!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Fast Batch Seeding Error:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seedAllFast().catch(console.error);
