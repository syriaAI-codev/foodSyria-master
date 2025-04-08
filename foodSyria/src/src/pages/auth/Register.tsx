import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// تعريف مخطط التحقق من صحة البيانات
const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  email: z.string().email('يرجى إدخال بريد إلكتروني صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, 'يرجى إدخال رقم هاتف صالح'),
  role: z.enum(['customer', 'restaurant', 'delivery'], {
    errorMap: () => ({ message: 'يرجى اختيار دور صالح' })
  })
});

// نوع بيانات النموذج
type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  // إعداد نموذج react-hook-form مع التحقق من صحة البيانات باستخدام zod
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer'
    }
  });

  // معالجة تقديم النموذج
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      setLoading(true);

      const { error } = await signUp(data.email, data.password, data.name, data.phone, data.role);

      if (error) {
        setError(error.message || 'فشل في إنشاء الحساب');
        return;
      }

      // سيتم التوجيه تلقائيًا من خلال AuthContext
    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">إنشاء حساب جديد</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            أو{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              تسجيل الدخول إلى حسابك
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-r-4 border-red-500 p-4">
            <div className="flex">
              <div className="mr-3">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                الاسم
              </label>
              <input
                id="name"
                type="text"
                className="input-field rounded-t-md"
                placeholder="الاسم"
                {...register('name')}
              />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="input-field"
                placeholder="البريد الإلكتروني"
                {...register('email')}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="input-field"
                placeholder="كلمة المرور"
                {...register('password')}
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                رقم الهاتف
              </label>
              <input
                id="phone"
                type="tel"
                className="input-field"
                placeholder="رقم الهاتف (مثال: +963911111111)"
                {...register('phone')}
              />
              {errors.phone && <p className="error-message">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="role" className="sr-only">
                الدور
              </label>
              <select
                id="role"
                className="input-field rounded-b-md"
                {...register('role')}
              >
                <option value="customer">عميل</option>
                <option value="restaurant">صاحب مطعم</option>
                <option value="delivery">عامل توصيل</option>
              </select>
              {errors.role && <p className="error-message">{errors.role.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'إنشاء حساب'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
