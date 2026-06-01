import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual Supabase Project API details
const supabaseUrl = 'https://mogszrmpyrfytlowrtom.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ3N6cm1weXJmeXRsb3dydG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTc5NDksImV4cCI6MjA5NTgzMzk0OX0.NYy_GO_uq-yWJWyhSNB4E3RA3bK3fDN0QHlcbdad8Ds';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);