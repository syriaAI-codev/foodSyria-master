// src/middlewares/authMiddleware.js
const supabase = require('../config/supabase');

/**
 * وسيط للتحقق من المصادقة
 * يتحقق من وجود جلسة صالحة للمستخدم
 */
exports.protect = async (req, res, next) => {
  try {
    // الحصول على رمز الوصول من رأس الطلب
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح به، يرجى تسجيل الدخول'
      });
    }

    const token = authHeader.split(' ')[1];

    // التحقق من صحة الرمز باستخدام Supabase
    const { data: sessionData, error: sessionError } = await supabase.auth.getUser(token);

    if (sessionError || !sessionData.user) {
      return res.status(401).json({
        success: false,
        message: 'الرمز غير صالح أو منتهي الصلاحية',
        error: sessionError ? sessionError.message : 'لا يوجد مستخدم مرتبط بهذا الرمز'
      });
    }

    // إضافة معلومات المستخدم إلى الطلب
    req.user = sessionData.user;

    // الحصول على معلومات المستخدم الإضافية من جدول users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', sessionData.user.id)
      .single();

    if (userError) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على معلومات المستخدم',
        error: userError.message
      });
    }

    // إضافة دور المستخدم إلى الطلب
    req.user.role = userData.role;
    req.user.name = userData.name;
    req.user.phone = userData.phone;
    req.user.address = userData.address;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'غير مصرح به، يرجى تسجيل الدخول',
      error: error.message
    });
  }
};

/**
 * وسيط للتحقق من الأدوار
 * يتحقق من أن المستخدم لديه الدور المطلوب
 * @param  {...string} roles - الأدوار المسموح بها
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح به، يرجى تسجيل الدخول'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'غير مسموح لك بالوصول إلى هذا المورد'
      });
    }

    next();
  };
};
