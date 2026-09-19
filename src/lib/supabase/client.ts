import { createBrowserClient } from '@supabase/ssr';

const DEFAULT_SUPABASE_URL = 'https://futeygijcshphluikgnh.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1dGV5Z2lqY3NocGhsdWlrZ25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5MTA0MTMsImV4cCI6MjEwNDQ4NjQxM30.1Qz08CYWZ5a0bFn8XIbm47BFaV99ZNvrVZx6INil-hI';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
