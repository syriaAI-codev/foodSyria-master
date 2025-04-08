// src/middlewares/errorHandler.js
/**
 * وسيط للتعامل مع الأخطاء بشكل مركزي
 */

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // التحقق من نوع الخطأ وإرسال الاستجابة المناسبة
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'خطأ في التحقق من البيانات',
      errors: err.errors
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'غير مصرح لك بالوصول'
    });
  }
  
  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      success: false,
      message: 'ليس لديك صلاحية للقيام بهذا الإجراء'
    });
  }
  
  // الأخطاء العامة
  const statusCode = err.statusCode || 500;
  const message = err.message || 'حدث خطأ في الخادم';
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
