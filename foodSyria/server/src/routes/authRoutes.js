// src/routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// التحقق من صحة البيانات المدخلة للتسجيل
const registerValidation = [
  check('email', 'يرجى إدخال بريد إلكتروني صالح').isEmail(),
  check('password', 'يجب أن تكون كلمة المرور 6 أحرف على الأقل').isLength({ min: 6 }),
  check('name', 'الاسم مطلوب').notEmpty(),
  check('phone', 'رقم الهاتف مطلوب ويجب أن يكون بتنسيق صحيح').matches(/^\+?[0-9]{10,14}$/)
];

// التحقق من صحة البيانات المدخلة لتسجيل الدخول
const loginValidation = [
  check('email', 'يرجى إدخال بريد إلكتروني صالح').isEmail(),
  check('password', 'كلمة المرور مطلوبة').notEmpty()
];

// التحقق من صحة البيانات المدخلة لتحديث الملف الشخصي
const updateProfileValidation = [
  check('name', 'الاسم مطلوب').notEmpty(),
  check('phone', 'رقم الهاتف مطلوب ويجب أن يكون بتنسيق صحيح').matches(/^\+?[0-9]{10,14}$/)
];

// التحقق من صحة البيانات المدخلة لتغيير كلمة المرور
const changePasswordValidation = [
  check('password', 'يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل').isLength({ min: 6 })
];

// التحقق من صحة البيانات المدخلة لإعادة تعيين كلمة المرور
const resetPasswordValidation = [
  check('email', 'يرجى إدخال بريد إلكتروني صالح').isEmail()
];

// مسارات المصادقة
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/logout', authController.logout);
router.get('/me', protect, authController.getCurrentUser);
router.put('/update-profile', protect, updateProfileValidation, authController.updateProfile);
router.post('/change-password', protect, changePasswordValidation, authController.changePassword);
router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

module.exports = router;
