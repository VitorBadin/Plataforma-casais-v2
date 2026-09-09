import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Retorna cliente nulo/placeholder se variáveis de ambiente não estiverem configuradas
    // A aplicação fará fallback gracioso para o Mock Data Service
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
