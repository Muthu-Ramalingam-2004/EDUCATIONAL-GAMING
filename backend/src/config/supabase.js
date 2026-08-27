import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-supabase-project')) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('⚡ Supabase Client initialized successfully');
  } catch (err) {
    console.warn('⚠️ Supabase initialization warning:', err.message);
  }
} else {
  console.log('ℹ️ Supabase environment variables not set or using placeholders. Using high-performance backend storage service.');
}

export { supabase };
