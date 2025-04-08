const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// إنشاء عميل Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// قراءة ملف البيانات
const seedFilePath = path.join(__dirname, 'seed.sql');
const seedSQL = fs.readFileSync(seedFilePath, 'utf8');

// تقسيم الملف إلى أوامر SQL منفصلة
const sqlCommands = seedSQL
  .split(';')
  .map(command => command.trim())
  .filter(command => command.length > 0);

// تنفيذ الأوامر بالتسلسل
async function seedDatabase() {
  console.log('بدء إدخال بيانات الاختبار...');
  
  try {
    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i] + ';';
      console.log(`تنفيذ الأمر ${i + 1} من ${sqlCommands.length}`);
      
      const { data, error } = await supabase.rpc('exec_sql', { sql: command });
      
      if (error) {
        console.error(`خطأ في تنفيذ الأمر ${i + 1}:`, error);
      }
    }
    
    console.log('تم إدخال بيانات الاختبار بنجاح!');
  } catch (error) {
    console.error('حدث خطأ أثناء إدخال البيانات:', error);
  }
}

// تنفيذ الدالة
seedDatabase();
