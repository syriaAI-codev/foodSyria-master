import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// صفحة لوحة تحكم المدير الرئيسية
const AdminDashboard: React.FC = () => {
  // حالة إحصائيات النظام
  const [stats, setStats] = useState({
    totalOrders: 1245,
    totalRevenue: 12450000,
    totalUsers: 850,
    totalRestaurants: 32,
    totalDrivers: 45,
    activeDrivers: 28,
    pendingOrders: 12,
    completedOrders: 1180,
    cancelledOrders: 53
  });
  
  // حالة الطلبات الأخيرة
  const [recentOrders, setRecentOrders] = useState<Array<{
    id: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
    restaurant: {
      id: number;
      name: string;
    };
    customer: {
      name: string;
    };
    total: number;
    createdAt: string;
  }>>([
    {
      id: 1001,
      status: 'on_the_way',
      restaurant: {
        id: 1,
        name: 'مطعم الشام'
      },
      customer: {
        name: 'محمد أحمد'
      },
      total: 29500,
      createdAt: '2025-04-06T14:30:00'
    },
    {
      id: 1002,
      status: 'preparing',
      restaurant: {
        id: 2,
        name: 'مطعم دمشق'
      },
      customer: {
        name: 'أحمد محمود'
      },
      total: 12500,
      createdAt: '2025-04-06T14:45:00'
    },
    {
      id: 1003,
      status: 'pending',
      restaurant: {
        id: 3,
        name: 'مطعم حلب'
      },
      customer: {
        name: 'علي حسن'
      },
      total: 32000,
      createdAt: '2025-04-06T15:00:00'
    },
    {
      id: 1000,
      status: 'delivered',
      restaurant: {
        id: 1,
        name: 'مطعم الشام'
      },
      customer: {
        name: 'سامر خالد'
      },
      total: 18500,
      createdAt: '2025-04-06T13:15:00'
    },
    {
      id: 999,
      status: 'delivered',
      restaurant: {
        id: 2,
        name: 'مطعم دمشق'
      },
      customer: {
        name: 'رامي علي'
      },
      total: 22000,
      createdAt: '2025-04-06T12:30:00'
    }
  ]);
  
  // حالة المطاعم الأكثر مبيعًا
  const [topRestaurants, setTopRestaurants] = useState<Array<{
    id: number;
    name: string;
    ordersCount: number;
    revenue: number;
    rating: number;
  }>>([
    {
      id: 1,
      name: 'مطعم الشام',
      ordersCount: 450,
      revenue: 4500000,
      rating: 4.8
    },
    {
      id: 2,
      name: 'مطعم دمشق',
      ordersCount: 380,
      revenue: 3800000,
      rating: 4.6
    },
    {
      id: 3,
      name: 'مطعم حلب',
      ordersCount: 320,
      revenue: 3200000,
      rating: 4.5
    }
  ]);
  
  // حالة المستخدمين الجدد
  const [newUsers, setNewUsers] = useState<Array<{
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'restaurant' | 'driver';
    createdAt: string;
  }>>([
    {
      id: 101,
      name: 'محمد سعيد',
      email: 'mohammad@example.com',
      role: 'customer',
      createdAt: '2025-04-06T10:15:00'
    },
    {
      id: 102,
      name: 'مطعم البيت',
      email: 'albait@example.com',
      role: 'restaurant',
      createdAt: '2025-04-06T09:30:00'
    },
    {
      id: 103,
      name: 'أحمد خالد',
      email: 'ahmad@example.com',
      role: 'driver',
      createdAt: '2025-04-06T08:45:00'
    }
  ]);
  
  // حالة الفترة الزمنية للإحصائيات
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('week');
  
  // تحديث الإحصائيات عند تغيير الفترة الزمنية
  useEffect(() => {
    // في التطبيق الحقيقي، سيتم استرجاع الإحصائيات من قاعدة البيانات
    // هنا نستخدم بيانات وهمية للعرض
    if (timeRange === 'today') {
      setStats({
        totalOrders: 45,
        totalRevenue: 450000,
        totalUsers: 850,
        totalRestaurants: 32,
        totalDrivers: 45,
        activeDrivers: 28,
        pendingOrders: 12,
        completedOrders: 30,
        cancelledOrders: 3
      });
    } else if (timeRange === 'week') {
      setStats({
        totalOrders: 320,
        totalRevenue: 3200000,
        totalUsers: 850,
        totalRestaurants: 32,
        totalDrivers: 45,
        activeDrivers: 28,
        pendingOrders: 12,
        completedOrders: 300,
        cancelledOrders: 8
      });
    } else if (timeRange === 'month') {
      setStats({
        totalOrders: 1245,
        totalRevenue: 12450000,
        totalUsers: 850,
        totalRestaurants: 32,
        totalDrivers: 45,
        activeDrivers: 28,
        pendingOrders: 12,
        completedOrders: 1180,
        cancelledOrders: 53
      });
    } else if (timeRange === 'year') {
      setStats({
        totalOrders: 15240,
        totalRevenue: 152400000,
        totalUsers: 850,
        totalRestaurants: 32,
        totalDrivers: 45,
        activeDrivers: 28,
        pendingOrders: 12,
        completedOrders: 14500,
        cancelledOrders: 728
      });
    }
  }, [timeRange]);
  
  // ترجمة حالة الطلب
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' };
      case 'confirmed': return { label: 'تم التأكيد', color: 'bg-blue-100 text-blue-800' };
      case 'preparing': return { label: 'قيد التحضير', color: 'bg-indigo-100 text-indigo-800' };
      case 'ready': return { label: 'جاهز للتوصيل', color: 'bg-purple-100 text-purple-800' };
      case 'on_the_way': return { label: 'في الطريق', color: 'bg-primary-100 text-primary-800' };
      case 'delivered': return { label: 'تم التوصيل', color: 'bg-green-100 text-green-800' };
      case 'cancelled': return { label: 'ملغي', color: 'bg-red-100 text-red-800' };
      default: return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // ترجمة دور المستخدم
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'customer': return { label: 'عميل', color: 'bg-blue-100 text-blue-800' };
      case 'restaurant': return { label: 'مطعم', color: 'bg-purple-100 text-purple-800' };
      case 'driver': return { label: 'سائق', color: 'bg-primary-100 text-primary-800' };
      default: return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // تنسيق التاريخ والوقت
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('ar-SY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // تنسيق المبلغ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SY', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">لوحة تحكم المدير</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/admin/tracking" className="text-gray-600 hover:text-primary-600">تتبع الطلبات</a>
            <a href="/admin/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/admin/users" className="text-gray-600 hover:text-primary-600">المستخدمين</a>
            <a href="/admin/settings" className="text-gray-600 hover:text-primary-600">الإعدادات</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="mt-2 text-gray-600">نظرة عامة على أداء النظام والإحصائيات</p>
        </div>
        
        {/* أدوات التصفية */}
        <div className="mb-6">
          <div className="flex justify-end">
            <div className="inline-flex shadow-sm rounded-md">
              <button
                onClick={() => setTimeRange('today')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  timeRange === 'today'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                اليوم
              </button>
              <button
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                الأسبوع
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                الشهر
              </button>
              <button
                onClick={() => setTimeRange('year')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  timeRange === 'year'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                السنة
              </button>
            </div>
          </div>
        </div>
        
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">إجمالي الطلبات</h3>
              <span className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalOrders)}</p>
              <p className="mr-2 text-sm text-gray-600">طلب</p>
            </div>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm font-medium">+5.3%</span>
              <span className="mr-1 text-xs text-gray-500">مقارنة بالفترة السابقة</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">إجمالي الإيرادات</h3>
              <span className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="mr-2 text-sm text-gray-600">ل.س</p>
            </div>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm font-medium">+8.2%</span>
              <span className="mr-1 text-xs text-gray-500">مقارنة بالفترة السابقة</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">إجمالي المستخدمين</h3>
              <span className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.totalUsers)}</p>
              <p className="mr-2 text-sm text-gray-600">مستخدم</p>
            </div>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm font-medium">+3.1%</span>
              <span className="mr-1 text-xs text-gray-500">مقارنة بالفترة السابقة</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">إجمالي المطاعم</h3>
              <span className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
            </div>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stats.totalRestaurants}</p>
              <p className="mr-2 text-sm text-gray-600">مطعم</p>
            </div>
            <div className="mt-1 flex items-center">
              <span className="text-green-600 text-sm font-medium">+1.8%</span>
              <span className="mr-1 text-xs text-gray-500">مقارنة بالفترة السابقة</span>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* الطلبات الأخيرة */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">الطلبات الأخيرة</h2>
                <a href="/admin/orders" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  عرض الكل
                </a>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="text-gray-900 font-medium ml-2">#{order.id}</span>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color}`}>
                          {getStatusLabel(order.status).label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {order.customer.name} - {order.restaurant.name}
                      </p>
                      <p className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</p>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{formatCurrency(order.total)} ل.س</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* المطاعم الأكثر مبيعًا */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">المطاعم الأكثر مبيعًا</h2>
                <a href="/admin/restaurants" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  عرض الكل
                </a>
              </div>
              
              <div className="divide-y divide-gray-200">
                {topRestaurants.map((restaurant) => (
                  <div key={restaurant.id} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{restaurant.name}</h3>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="mr-1 text-gray-900">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">عدد الطلبات</p>
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(restaurant.ordersCount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">الإيرادات</p>
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(restaurant.revenue)} ل.س</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            {/* إحصائيات إضافية */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">إحصائيات الطلبات</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">طلبات مكتملة</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(stats.completedOrders)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(stats.completedOrders / stats.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">طلبات قيد التنفيذ</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(stats.pendingOrders)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${(stats.pendingOrders / stats.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">طلبات ملغاة</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(stats.cancelledOrders)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(stats.cancelledOrders / stats.totalOrders) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">إحصائيات السائقين</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي السائقين</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.totalDrivers}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">السائقين النشطين</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.activeDrivers}</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(stats.activeDrivers / stats.totalDrivers) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((stats.activeDrivers / stats.totalDrivers) * 100)}% من السائقين نشطين حالياً
                </p>
              </div>
            </div>
            
            {/* المستخدمين الجدد */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">المستخدمين الجدد</h2>
                <a href="/admin/users" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                  عرض الكل
                </a>
              </div>
              
              <div className="divide-y divide-gray-200">
                {newUsers.map((user) => (
                  <div key={user.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleLabel(user.role).color}`}>
                        {getRoleLabel(user.role).label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      انضم {formatDateTime(user.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
