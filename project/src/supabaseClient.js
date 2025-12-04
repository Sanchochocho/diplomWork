import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ecgtdxwgtzyldvwfsyum.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZ3RkeHdndHp5bGR2d2ZzeXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDI4NTksImV4cCI6MjA3ODYxODg1OX0.gjkFztJxfN1MJ3SP57amc8pU1VvGjChDuhYIWcaORpM";

export const supabase = createClient(supabaseUrl, supabaseKey);