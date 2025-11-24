import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://pkqcbjtfzreyloviqhoc.supabase.co";  
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcWNianRmenJleWxvdmlxaG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MjY1MTcsImV4cCI6MjA3OTUwMjUxN30.kHD71Latei6Mu1cJHs-TE-ewCehG9PfAeHrm4KtFTnw";  

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
