# دليل النشر والتشغيل - تطبيق فود سوريا

## مقدمة

هذا الدليل يوضح خطوات نشر وتشغيل تطبيق فود سوريا في بيئة الإنتاج. يتكون التطبيق من جزأين رئيسيين:
1. الواجهة الخلفية (Backend) - خادم Node.js/Express
2. الواجهة الأمامية (Frontend) - تطبيق React

## متطلبات النشر

- حساب على منصة استضافة مثل Render أو Heroku أو Vercel
- حساب Supabase مع قاعدة بيانات مُعدة
- مفتاح واجهة برمجة تطبيقات Google Maps
- Node.js v14 أو أحدث
- NPM v6 أو أحدث

## خطوات النشر

### 1. إعداد قاعدة البيانات Supabase

1. قم بتسجيل الدخول إلى حساب Supabase الخاص بك على https://supabase.com/
2. انتقل إلى مشروعك (استخدم المشروع الموجود: https://jxjpnmwydldorerjjfhe.supabase.co)
3. انتقل إلى قسم "SQL Editor" وقم بتنفيذ سكريبت إنشاء الجداول من ملف `server/src/db/database_schema.sql`
4. قم بتنفيذ سكريبت إدخال بيانات الاختبار من ملف `server/src/db/seed.sql`

### 2. نشر الواجهة الخلفية (Backend)

#### باستخدام Render

1. قم بإنشاء حساب على Render: https://render.com/
2. انقر على "New" ثم اختر "Web Service"
3. قم بربط مستودع Git الخاص بك أو قم بتحميل الكود مباشرة
4. قم بتعيين الإعدادات التالية:
   - Name: foodsyria-backend
   - Environment: Node
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
5. قم بإضافة متغيرات البيئة التالية:
   - PORT: 5000
   - SUPABASE_URL: https://jxjpnmwydldorerjjfhe.supabase.co
   - SUPABASE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   - JWT_SECRET: [قم بإنشاء سلسلة عشوائية آمنة]
   - NODE_ENV: production
6. انقر على "Create Web Service"

#### باستخدام Heroku

1. قم بإنشاء حساب على Heroku: https://www.heroku.com/
2. قم بتثبيت Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
3. قم بتسجيل الدخول إلى Heroku CLI:
   ```bash
   heroku login
   ```
4. انتقل إلى مجلد المشروع وقم بإنشاء تطبيق Heroku:
   ```bash
   cd server
   heroku create foodsyria-backend
   ```
5. قم بإضافة متغيرات البيئة:
   ```bash
   heroku config:set SUPABASE_URL=https://jxjpnmwydldorerjjfhe.supabase.co
   heroku config:set SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   heroku config:set JWT_SECRET=[قم بإنشاء سلسلة عشوائية آمنة]
   heroku config:set NODE_ENV=production
   ```
6. قم بنشر التطبيق:
   ```bash
   git subtree push --prefix server heroku main
   ```

### 3. نشر الواجهة الأمامية (Frontend)

#### باستخدام Vercel

1. قم بإنشاء حساب على Vercel: https://vercel.com/
2. قم بتثبيت Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. قم بتسجيل الدخول إلى Vercel CLI:
   ```bash
   vercel login
   ```
4. انتقل إلى مجلد الواجهة الأمامية:
   ```bash
   cd src
   ```
5. قم بإنشاء ملف `.env.production` وأضف المتغيرات البيئية التالية:
   ```
   REACT_APP_SUPABASE_URL=https://jxjpnmwydldorerjjfhe.supabase.co
   REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8
   REACT_APP_API_URL=[رابط الواجهة الخلفية المنشورة]/api
   ```
6. قم بنشر التطبيق:
   ```bash
   vercel --prod
   ```

#### باستخدام Netlify

1. قم بإنشاء حساب على Netlify: https://www.netlify.com/
2. قم ببناء التطبيق للإنتاج:
   ```bash
   cd src
   npm run build
   ```
3. قم بتثبيت Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
4. قم بتسجيل الدخول إلى Netlify CLI:
   ```bash
   netlify login
   ```
5. قم بنشر التطبيق:
   ```bash
   netlify deploy --prod --dir=build
   ```
6. قم بإضافة متغيرات البيئة من خلال لوحة تحكم Netlify:
   - REACT_APP_SUPABASE_URL: https://jxjpnmwydldorerjjfhe.supabase.co
   - REACT_APP_SUPABASE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   - REACT_APP_GOOGLE_MAPS_API_KEY: AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8
   - REACT_APP_API_URL: [رابط الواجهة الخلفية المنشورة]/api

## التحقق من النشر

بعد إكمال عملية النشر، تحقق من النقاط التالية:

1. تأكد من أن الواجهة الخلفية تعمل بشكل صحيح:
   - قم بزيارة `[رابط الواجهة الخلفية المنشورة]/api/health` للتأكد من أن الخادم يعمل
   - تحقق من سجلات الخادم للتأكد من عدم وجود أخطاء

2. تأكد من أن الواجهة الأمامية تعمل بشكل صحيح:
   - قم بزيارة رابط الواجهة الأمامية المنشورة
   - تحقق من أن الصفحة الرئيسية تظهر بشكل صحيح
   - تحقق من أن الاتصال بالواجهة الخلفية يعمل بشكل صحيح

3. اختبر تسجيل الدخول باستخدام حسابات الاختبار:
   - قم بتسجيل الدخول كمدير: moaz1993abdulrahman@gmail.com / 12345678
   - قم بتسجيل الدخول كعميل: mohammad@example.com / 12345678
   - قم بتسجيل الدخول كمطعم: alsham@example.com / 12345678
   - قم بتسجيل الدخول كسائق: rami@example.com / 12345678

4. اختبر الوظائف الرئيسية:
   - تصفح المطاعم وعرض القوائم
   - إنشاء طلب جديد
   - تتبع حالة الطلب
   - إدارة المطعم وتحديث القائمة
   - تتبع التوصيل وتحديث حالة الطلب
   - لوحة تحكم المدير وإدارة المستخدمين

## استكشاف الأخطاء وإصلاحها

### مشاكل الواجهة الخلفية

1. **خطأ في الاتصال بقاعدة البيانات**:
   - تحقق من صحة متغيرات البيئة SUPABASE_URL و SUPABASE_KEY
   - تحقق من حالة خدمة Supabase على https://status.supabase.com/

2. **خطأ في المصادقة**:
   - تحقق من صحة متغير البيئة JWT_SECRET
   - تحقق من صلاحية رمز الوصول JWT

3. **خطأ في تنفيذ الطلبات**:
   - تحقق من سجلات الخادم للحصول على تفاصيل الخطأ
   - تحقق من صحة الطلبات المرسلة من الواجهة الأمامية

### مشاكل الواجهة الأمامية

1. **خطأ في الاتصال بالواجهة الخلفية**:
   - تحقق من صحة متغير البيئة REACT_APP_API_URL
   - تحقق من إعدادات CORS في الواجهة الخلفية

2. **خطأ في تكامل خرائط Google**:
   - تحقق من صحة متغير البيئة REACT_APP_GOOGLE_MAPS_API_KEY
   - تحقق من تفعيل واجهات برمجة التطبيقات المطلوبة في وحدة تحكم Google Cloud

3. **مشاكل في العرض أو التصميم**:
   - تحقق من توافق المتصفح
   - تحقق من تحميل ملفات CSS بشكل صحيح

## الصيانة والتحديثات

1. **مراقبة الأداء**:
   - قم بإعداد أدوات مراقبة مثل New Relic أو Sentry لتتبع أداء التطبيق والأخطاء

2. **النسخ الاحتياطي**:
   - قم بإعداد نسخ احتياطي منتظم لقاعدة البيانات Supabase

3. **التحديثات**:
   - قم بتحديث التبعيات بانتظام للحفاظ على أمان التطبيق
   - اختبر التحديثات في بيئة التطوير قبل تطبيقها في بيئة الإنتاج

## الخلاصة

باتباع هذا الدليل، يمكنك نشر تطبيق فود سوريا بنجاح في بيئة الإنتاج. تأكد من اختبار جميع الوظائف بعد النشر للتأكد من أن التطبيق يعمل بشكل صحيح.

للحصول على مساعدة إضافية، يرجى التواصل مع:
- معاذ عبد الرحمن: moaz1993abdulrahman@gmail.com
