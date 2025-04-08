import { createClient } from '@supabase/supabase-js';

// استيراد المتغيرات البيئية
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://jxjpnmwydldorerjjfhe.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4anBubXd5ZGxkb3JlcmpqZmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTU0MjEsImV4cCI6MjA1OTMzMTQyMX0.jx0eS89r6eqf2TJPCiqw_pj34uslPqRZHmVCdBtVZ-o';

// إنشاء عميل Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
