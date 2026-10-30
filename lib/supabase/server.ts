import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ejtdaugzbharggauafnv.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdGRhdWd6YmhhcmdnYXVhZm52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzM1NzU0NSwiZXhwIjoyMTA4OTMzNTQ1fQ.nW8CxzSwOjWcjuYd8HIAWc5RhBH_6teNN1r421kIPHM';

/**
 * Server-only privileged Supabase client.
 * Strictly used in Next.js Server Components, Server Actions, and Route Handlers (/api/*).
 * Never imported into client components.
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
