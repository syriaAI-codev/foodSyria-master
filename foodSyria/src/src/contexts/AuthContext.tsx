import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../utils/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

// تعريف نوع بيانات المستخدم
interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'restaurant' | 'delivery';
  phone?: string;
  address?: string;
}

// تعريف نوع بيانات سياق المصادقة
interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null; data: any | null }>;
  signUp: (email: string, password: string, name: string, phone: string, role: string) => Promise<{ error: any | null; data: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserData>) => Promise<{ error: any | null; data: any | null }>;
}

// إنشاء سياق المصادقة
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// مزود سياق المصادقة
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // التحقق من جلسة المستخدم عند تحميل التطبيق
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      
      // الحصول على جلسة المستخدم الحالية
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('خطأ في الحصول على الجلسة:', error.message);
      }
      
      if (session) {
        setSession(session);
        await fetchUserData(session.user.id);
      }
      
      setLoading(false);
    };
    
    getSession();
    
    // الاستماع لتغييرات حالة المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (event === 'SIGNED_IN' && session) {
          await fetchUserData(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          navigate('/login');
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
  // جلب بيانات المستخدم من قاعدة البيانات
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setUser({
          id: userId,
          email: session?.user.email || '',
          name: data.name,
          role: data.role,
          phone: data.phone,
          address: data.address
        });
        
        // توجيه المستخدم إلى الصفحة المناسبة حسب دوره
        if (data.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (data.role === 'restaurant') {
          navigate('/restaurant/dashboard');
        } else if (data.role === 'delivery') {
          navigate('/delivery/dashboard');
        } else {
          navigate('/restaurants');
        }
      }
    } catch (error) {
      console.error('خطأ في جلب بيانات المستخدم:', error);
    }
  };
  
  // تسجيل الدخول
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        return { error, data: null };
      }
      
      return { error: null, data };
    } catch (error) {
      return { error, data: null };
    }
  };
  
  // تسجيل مستخدم جديد
  const signUp = async (email: string, password: string, name: string, phone: string, role: string) => {
    try {
      // إنشاء المستخدم في Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (authError) {
        return { error: authError, data: null };
      }
      
      if (authData.user) {
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
          return { error: userError, data: null };
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
            return { error: deliveryError, data: null };
          }
        }
        
        return { error: null, data: authData };
      }
      
      return { error: new Error('فشل في إنشاء المستخدم'), data: null };
    } catch (error) {
      return { error, data: null };
    }
  };
  
  // تسجيل الخروج
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };
  
  // تحديث معلومات المستخدم
  const updateProfile = async (data: Partial<UserData>) => {
    try {
      if (!user) {
        return { error: new Error('المستخدم غير مسجل الدخول'), data: null };
      }
      
      const { data: userData, error } = await supabase
        .from('users')
        .update({
          name: data.name,
          phone: data.phone,
          address: data.address
        })
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        return { error, data: null };
      }
      
      // تحديث بيانات المستخدم في الحالة
      setUser({
        ...user,
        name: data.name || user.name,
        phone: data.phone || user.phone,
        address: data.address || user.address
      });
      
      return { error: null, data: userData };
    } catch (error) {
      return { error, data: null };
    }
  };
  
  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// هوك استخدام سياق المصادقة
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  
  return context;
};
