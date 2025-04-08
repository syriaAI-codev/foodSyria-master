# تطبيق فود سوريا - منصة توصيل الطعام

![فود سوريا](https://via.placeholder.com/800x200?text=Food+Syria)

## نظرة عامة

فود سوريا هو تطبيق ويب متكامل لتوصيل الطعام مصمم خصيصًا للسوق السوري. يوفر التطبيق منصة تربط بين العملاء والمطاعم وعمال التوصيل، مع دعم كامل للغة العربية واتجاه RTL.

### الميزات الرئيسية

- **واجهة مستخدم عربية كاملة** مع دعم RTL
- **نظام مصادقة متعدد الأدوار** (عميل، مطعم، سائق توصيل، مدير)
- **تكامل خرائط Google** لتحديد المواقع وتتبع التوصيل
- **نظام إدارة طلبات متكامل** من الطلب إلى التوصيل
- **لوحة تحكم مدير شاملة** لإدارة جميع جوانب النظام
- **تحديثات في الوقت الفعلي** لحالة الطلبات ومواقع السائقين
- **تصميم متجاوب** يعمل على جميع أحجام الشاشات

## التقنيات المستخدمة

### الواجهة الأمامية
- **React.js** - إطار عمل JavaScript لبناء واجهات المستخدم
- **TypeScript** - لغة برمجة مطورة من JavaScript مع إضافة أنواع ثابتة
- **TailwindCSS** - إطار عمل CSS للتصميم السريع
- **Framer Motion** - مكتبة للرسوم المتحركة في React
- **React Router** - للتنقل بين الصفحات
- **React Hook Form** - لإدارة النماذج
- **Zod** - للتحقق من صحة البيانات
- **Axios** - لطلبات HTTP
- **@react-google-maps/api** - لتكامل خرائط Google

### الواجهة الخلفية
- **Node.js** - بيئة تشغيل JavaScript على الخادم
- **Express.js** - إطار عمل لتطبيقات الويب في Node.js
- **Supabase** - منصة قواعد البيانات كخدمة مبنية على PostgreSQL
- **JWT** - للمصادقة وإدارة الجلسات
- **Bcrypt** - لتشفير كلمات المرور
- **Dotenv** - لإدارة متغيرات البيئة

## هيكل المشروع

```
foodSyria/
├── docs/                      # وثائق المشروع
│   ├── requirements.md        # متطلبات المشروع
│   ├── entity_relationships.md # العلاقات بين الكيانات
│   ├── database_schema.sql    # مخطط قاعدة البيانات
│   └── seed_data.sql          # بيانات الاختبار
│
├── server/                    # الواجهة الخلفية (Node.js/Express)
│   ├── src/
│   │   ├── config/            # ملفات التكوين
│   │   ├── controllers/       # وحدات التحكم
│   │   ├── middlewares/       # الوسائط
│   │   ├── routes/            # المسارات
│   │   ├── utils/             # الأدوات المساعدة
│   │   ├── db/                # سكريبتات قاعدة البيانات
│   │   └── index.js           # نقطة الدخول
│   ├── package.json
│   └── .env                   # متغيرات البيئة (غير مضمنة في Git)
│
└── src/                       # الواجهة الأمامية (React)
    ├── src/
    │   ├── components/        # مكونات React
    │   │   ├── ui/            # مكونات واجهة المستخدم الأساسية
    │   │   └── maps/          # مكونات الخرائط
    │   ├── contexts/          # سياقات React
    │   ├── hooks/             # خطافات React المخصصة
    │   ├── pages/             # صفحات التطبيق
    │   │   ├── auth/          # صفحات المصادقة
    │   │   ├── customer/      # صفحات العميل
    │   │   ├── restaurant/    # صفحات المطعم
    │   │   ├── delivery/      # صفحات السائق
    │   │   └── admin/         # صفحات المدير
    │   ├── utils/             # الأدوات المساعدة
    │   ├── App.tsx            # مكون التطبيق الرئيسي
    │   └── index.tsx          # نقطة الدخول
    ├── package.json
    └── tailwind.config.js     # تكوين TailwindCSS
```

## متطلبات النظام

- Node.js v14 أو أحدث
- NPM v6 أو أحدث
- حساب Supabase
- مفتاح واجهة برمجة تطبيقات Google Maps

## الإعداد والتثبيت

### الواجهة الخلفية

1. انتقل إلى مجلد الواجهة الخلفية:
   ```bash
   cd server
   ```

2. قم بتثبيت التبعيات:
   ```bash
   npm install
   ```

3. قم بإنشاء ملف `.env` وأضف المتغيرات البيئية التالية:
   ```
   PORT=5000
   SUPABASE_URL=https://jxjpnmwydldorerjjfhe.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT_SECRET=your_jwt_secret
   ```

4. قم بتشغيل الخادم:
   ```bash
   npm run dev
   ```

### الواجهة الأمامية

1. انتقل إلى مجلد الواجهة الأمامية:
   ```bash
   cd src
   ```

2. قم بتثبيت التبعيات:
   ```bash
   npm install
   ```

3. قم بإنشاء ملف `.env` وأضف المتغيرات البيئية التالية:
   ```
   REACT_APP_SUPABASE_URL=https://jxjpnmwydldorerjjfhe.supabase.co
   REACT_APP_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. قم بتشغيل التطبيق:
   ```bash
   npm start
   ```

## إعداد قاعدة البيانات

1. قم بإنشاء مشروع جديد في [Supabase](https://supabase.com/)
2. قم بتنفيذ سكريبت إنشاء الجداول من ملف `server/src/db/database_schema.sql`
3. قم بإدخال بيانات الاختبار باستخدام سكريبت `server/src/db/seedDatabase.js`:
   ```bash
   cd server
   node src/db/seedDatabase.js
   ```

## بيانات اعتماد حسابات الاختبار

### حساب المدير
- **البريد الإلكتروني**: moaz1993abdulrahman@gmail.com
- **كلمة المرور**: 12345678

### حسابات العملاء
1. **البريد الإلكتروني**: mohammad@example.com
   **كلمة المرور**: 12345678

2. **البريد الإلكتروني**: ahmad@example.com
   **كلمة المرور**: 12345678

3. **البريد الإلكتروني**: ali@example.com
   **كلمة المرور**: 12345678

### حسابات المطاعم
1. **البريد الإلكتروني**: alsham@example.com
   **كلمة المرور**: 12345678

2. **البريد الإلكتروني**: damascus@example.com
   **كلمة المرور**: 12345678

3. **البريد الإلكتروني**: aleppo@example.com
   **كلمة المرور**: 12345678

### حسابات السائقين
1. **البريد الإلكتروني**: rami@example.com
   **كلمة المرور**: 12345678

2. **البريد الإلكتروني**: samer@example.com
   **كلمة المرور**: 12345678

3. **البريد الإلكتروني**: khaled@example.com
   **كلمة المرور**: 12345678

## النشر

### نشر الواجهة الخلفية
1. قم بإنشاء حساب على [Render](https://render.com/) أو [Heroku](https://www.heroku.com/)
2. قم بإنشاء خدمة ويب جديدة وربطها بمستودع Git الخاص بك
3. قم بتعيين متغيرات البيئة المطلوبة
4. قم بنشر التطبيق

### نشر الواجهة الأمامية
1. قم ببناء التطبيق للإنتاج:
   ```bash
   cd src
   npm run build
   ```
2. قم بنشر المجلد `build` على [Netlify](https://www.netlify.com/) أو [Vercel](https://vercel.com/)
3. قم بتعيين متغيرات البيئة المطلوبة

## المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. قم بعمل fork للمستودع
2. قم بإنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. قم بإجراء التغييرات الخاصة بك
4. قم بعمل commit للتغييرات (`git commit -m 'إضافة ميزة رائعة'`)
5. قم بدفع الفرع (`git push origin feature/amazing-feature`)
6. قم بفتح طلب سحب

## الترخيص

هذا المشروع مرخص بموجب [ترخيص MIT](LICENSE).

## الاتصال

معاذ عبد الرحمن - moaz1993abdulrahman@gmail.com

رابط المشروع: [https://github.com/moazabdulrahman/foodsyria](https://github.com/moazabdulrahman/foodsyria)
