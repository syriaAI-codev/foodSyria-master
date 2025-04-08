// src/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const errorHandler = require('./middlewares/errorHandler');

// تحميل متغيرات البيئة
dotenv.config();

// إنشاء تطبيق Express
const app = express();

// الوسائط (Middlewares)
app.use(helmet()); // تعزيز الأمان
app.use(cors()); // السماح بطلبات CORS
app.use(express.json()); // تحليل طلبات JSON
app.use(express.urlencoded({ extended: true })); // تحليل طلبات URL المشفرة
app.use(morgan('dev')); // تسجيل الطلبات

// المسارات الأساسية
app.get('/', (req, res) => {
  res.json({
    message: 'مرحبًا بك في واجهة برمجة تطبيقات FoodSyria',
    status: 'الخادم يعمل بنجاح',
    version: '1.0.0'
  });
});

// مسارات API
app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/restaurants', require('./routes/restaurantRoutes'));
// app.use('/api/menu-items', require('./routes/menuItemRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/deliveries', require('./routes/deliveryRoutes'));

// وسيط التعامل مع المسارات غير الموجودة
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'المسار غير موجود'
  });
});

// وسيط التعامل مع الأخطاء
app.use(errorHandler);

// تحديد المنفذ
const PORT = process.env.PORT || 5000;

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT} في وضع ${process.env.NODE_ENV}`);
});

// التعامل مع الأخطاء غير المتوقعة
process.on('unhandledRejection', (err) => {
  console.error('خطأ غير معالج:', err);
  // في بيئة الإنتاج، يمكن إعادة تشغيل الخادم بدلاً من إيقافه
  process.exit(1);
});
