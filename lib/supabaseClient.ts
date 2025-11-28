import { createClient } from "@supabase/supabase-js";

// Safely retrieve environment variables with fallbacks to ensure the app runs 
// even if .env files are not loaded correctly in the preview environment.
const getEnvVar = (key: string, fallback: string): string => {
  try {
    // Use type assertion to avoid TypeScript errors if types aren't fully set up
    const meta = import.meta as any;
    // Check if meta.env exists before accessing properties on it
    if (meta && meta.env && meta.env[key]) {
      return meta.env[key];
    }
  } catch (e) {
    // Ignore errors accessing import.meta
  }
  return fallback;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://kwdtrtpyafulrbrffmuo.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3ZHRydHB5YWZ1bHJicmZmbXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNjUxMTUsImV4cCI6MjA3OTk0MTExNX0.ArU90fWv1nzrleKMKSK0NwTf-ztIFJzD2SO_jDvxVIM');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase credentials are missing. Authentication will fail.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);