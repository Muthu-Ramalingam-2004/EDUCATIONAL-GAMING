import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

let rawUrl = process.env.SUPABASE_URL || '';
// Clean trailing /rest/v1 or /rest/v1/ if present in environment variable
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').trim();
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

let supabase = null;

if (supabaseUrl && supabaseKey && !supabaseUrl.includes('your-supabase-project')) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('⚡ Supabase Client initialized successfully with URL:', supabaseUrl);
  } catch (err) {
    console.warn('⚠️ Supabase initialization warning:', err.message);
  }
} else {
  console.log('ℹ️ Supabase environment variables not set or using placeholders.');
}

export { supabase };
