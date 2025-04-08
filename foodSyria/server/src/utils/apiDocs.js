// src/utils/apiDocs.js
/**
 * وثائق API للمصادقة
 * 
 * هذا الملف يحتوي على توثيق لواجهات برمجة التطبيقات المتعلقة بالمصادقة
 */

/**
 * @api {post} /api/auth/register تسجيل مستخدم جديد
 * @apiName Register
 * @apiGroup Auth
 * 
 * @apiParam {String} email البريد الإلكتروني للمستخدم
 * @apiParam {String} password كلمة المرور (يجب أن تكون 6 أحرف على الأقل)
 * @apiParam {String} name اسم المستخدم
 * @apiParam {String} phone رقم هاتف المستخدم (بتنسيق دولي مثل +963911111111)
 * @apiParam {String} [role=customer] دور المستخدم (customer, restaurant, delivery)
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {String} message رسالة نجاح العملية
 * @apiSuccess {Object} data بيانات المستخدم المسجل
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 * @apiError {Array} errors قائمة بالأخطاء التفصيلية (في حالة أخطاء التحقق)
 */

/**
 * @api {post} /api/auth/login تسجيل الدخول
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiParam {String} email البريد الإلكتروني للمستخدم
 * @apiParam {String} password كلمة المرور
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {String} message رسالة نجاح العملية
 * @apiSuccess {Object} data بيانات المستخدم وجلسة الدخول
 * @apiSuccess {Object} data.user معلومات المستخدم
 * @apiSuccess {Object} data.session معلومات الجلسة
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 */

/**
 * @api {post} /api/auth/logout تسجيل الخروج
 * @apiName Logout
 * @apiGroup Auth
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {String} message رسالة نجاح العملية
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 */

/**
 * @api {get} /api/auth/me الحصول على معلومات المستخدم الحالي
 * @apiName GetCurrentUser
 * @apiGroup Auth
 * 
 * @apiHeader {String} Authorization رمز الوصول (Bearer Token)
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {Object} data بيانات المستخدم
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 */

/**
 * @api {put} /api/auth/update-profile تحديث معلومات المستخدم
 * @apiName UpdateProfile
 * @apiGroup Auth
 * 
 * @apiHeader {String} Authorization رمز الوصول (Bearer Token)
 * 
 * @apiParam {String} name اسم المستخدم
 * @apiParam {String} phone رقم هاتف المستخدم
 * @apiParam {String} [address] عنوان المستخدم
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {String} message رسالة نجاح العملية
 * @apiSuccess {Object} data بيانات المستخدم المحدثة
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 */

/**
 * @api {post} /api/auth/change-password تغيير كلمة المرور
 * @apiName ChangePassword
 * @apiGroup Auth
 * 
 * @apiHeader {String} Authorization رمز الوصول (Bearer Token)
 * 
 * @apiParam {String} password كلمة المرور الجديدة (يجب أن تكون 6 أحرف على الأقل)
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {String} message رسالة نجاح العملية
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 */

/**
 * @api {post} /api/auth/reset-password إعادة تعيين كلمة المرور
 * @apiName ResetPassword
 * @apiGroup Auth
 * 
 * @apiParam {String} email البريد الإلكتروني للمستخدم
 * 
 * @apiSuccess {Boolean} success حالة العملية
 * @apiSuccess {String} message رسالة نجاح العملية
 * 
 * @apiError {Boolean} success حالة العملية (false)
 * @apiError {String} message رسالة الخطأ
 */
