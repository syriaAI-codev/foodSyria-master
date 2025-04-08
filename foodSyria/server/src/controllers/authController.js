// src/controllers/authController.js
const supabase = require('../config/supabase');
const { validationResult } = require('express-validator');

/**
 * تسجيل مستخدم جديد
 * @route POST /api/auth/register
 */
exports.register = async (req, res, next) => {
  try {
    // التحقق من صحة البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'خطأ في البيانات المدخلة',
        errors: errors.array()
      });
    }

    const { email, password, name, phone, role = 'customer' } = req.body;

    // التحقق من صحة الدور
    const validRoles = ['customer', 'restaurant', 'delivery'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'الدور غير صالح',
        errors: [{ msg: 'الدور يجب أن يكون أحد القيم التالية: customer, restaurant, delivery' }]
      });
    }

    // إنشاء المستخدم في Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({
        success: false,
        message: 'فشل في إنشاء الحساب',
        error: authError.message
      });
    }

    // إضافة معلومات المستخدم الإضافية إلى جدول users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          name,
          phone,
          role
        }
      ]);

    if (userError) {
      // في حالة فشل إضافة البيانات الإضافية، نحاول حذف المستخدم من Auth
      await supabase.auth.admin.deleteUser(authData.user.id);
      
      return res.status(400).json({
        success: false,
        message: 'فشل في إضافة معلومات المستخدم',
        error: userError.message
      });
    }

    // إذا كان الدور هو "delivery"، نضيف سجل في جدول delivery_persons
    if (role === 'delivery') {
      const { error: deliveryError } = await supabase
        .from('delivery_persons')
        .insert([
          {
            user_id: authData.user.id,
            is_available: true
          }
        ]);

      if (deliveryError) {
        return res.status(400).json({
          success: false,
          message: 'فشل في إضافة معلومات عامل التوصيل',
          error: deliveryError.message
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name,
          role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * تسجيل الدخول
 * @route POST /api/auth/login
 */
exports.login = async (req, res, next) => {
  try {
    // التحقق من صحة البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'خطأ في البيانات المدخلة',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // تسجيل الدخول باستخدام Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(401).json({
        success: false,
        message: 'فشل في تسجيل الدخول',
        error: authError.message
      });
    }

    // الحصول على معلومات المستخدم الإضافية من جدول users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على معلومات المستخدم',
        error: userError.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name: userData.name,
          role: userData.role,
          phone: userData.phone
        },
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * تسجيل الخروج
 * @route POST /api/auth/logout
 */
exports.logout = async (req, res, next) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'فشل في تسجيل الخروج',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * الحصول على معلومات المستخدم الحالي
 * @route GET /api/auth/me
 */
exports.getCurrentUser = async (req, res, next) => {
  try {
    // الحصول على جلسة المستخدم الحالية
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح به',
        error: sessionError ? sessionError.message : 'لا توجد جلسة نشطة'
      });
    }

    // الحصول على معلومات المستخدم
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', sessionData.session.user.id)
      .single();

    if (userError) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على معلومات المستخدم',
        error: userError.message
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: sessionData.session.user.id,
          email: sessionData.session.user.email,
          name: userData.name,
          role: userData.role,
          phone: userData.phone,
          address: userData.address
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * تحديث معلومات المستخدم
 * @route PUT /api/auth/update-profile
 */
exports.updateProfile = async (req, res, next) => {
  try {
    // التحقق من صحة البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'خطأ في البيانات المدخلة',
        errors: errors.array()
      });
    }

    // الحصول على جلسة المستخدم الحالية
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح به',
        error: sessionError ? sessionError.message : 'لا توجد جلسة نشطة'
      });
    }

    const { name, phone, address } = req.body;
    const userId = sessionData.session.user.id;

    // تحديث معلومات المستخدم في جدول users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ name, phone, address })
      .eq('id', userId)
      .select()
      .single();

    if (userError) {
      return res.status(400).json({
        success: false,
        message: 'فشل في تحديث معلومات المستخدم',
        error: userError.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم تحديث معلومات المستخدم بنجاح',
      data: {
        user: userData
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * تغيير كلمة المرور
 * @route POST /api/auth/change-password
 */
exports.changePassword = async (req, res, next) => {
  try {
    // التحقق من صحة البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'خطأ في البيانات المدخلة',
        errors: errors.array()
      });
    }

    const { password } = req.body;

    // تغيير كلمة المرور باستخدام Supabase Auth
    const { data, error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'فشل في تغيير كلمة المرور',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * إعادة تعيين كلمة المرور (إرسال رابط إعادة التعيين)
 * @route POST /api/auth/reset-password
 */
exports.resetPassword = async (req, res, next) => {
  try {
    // التحقق من صحة البيانات المدخلة
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'خطأ في البيانات المدخلة',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // إرسال رابط إعادة تعيين كلمة المرور باستخدام Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'فشل في إرسال رابط إعادة تعيين كلمة المرور',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
    });
  } catch (error) {
    next(error);
  }
};
