import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejtdaugzbharggauafnv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdGRhdWd6YmhhcmdnYXVhZm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNTc1NDUsImV4cCI6MjEwODkzMzU0NX0.RBqKn771iKC1hcu1FST-KH_Mn0nUccVLwU86f9Tgjqc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
