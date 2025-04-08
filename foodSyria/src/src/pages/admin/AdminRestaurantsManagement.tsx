import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// صفحة إدارة المطاعم للمدير
const AdminRestaurantsManagement: React.FC = () => {
  // حالة المطاعم
  const [restaurants, setRestaurants] = useState<Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo?: string;
    categories: string[];
    rating: number;
    reviewsCount: number;
    status: 'active' | 'inactive' | 'pending' | 'rejected';
    createdAt: string;
    lastActive?: string;
    ordersCount: number;
    revenue: number;
  }>>([
    {
      id: 1,
      name: 'مطعم الشام',
      email: 'alsham@example.com',
      phone: '+963 11 1234567',
      address: 'دمشق، شارع الحمراء، بناء رقم 7',
      logo: 'https://via.placeholder.com/150',
      categories: ['شاورما', 'مشاوي', 'عربي'],
      rating: 4.8,
      reviewsCount: 120,
      status: 'active',
      createdAt: '2025-02-10T08:00:00',
      lastActive: '2025-04-06T15:10:00',
      ordersCount: 450,
      revenue: 4500000
    },
    {
      id: 2,
      name: 'مطعم دمشق',
      email: 'damascus@example.com',
      phone: '+963 11 2345678',
      address: 'دمشق، شارع بغداد، بناء رقم 12',
      logo: 'https://via.placeholder.com/150',
      categories: ['فطور', 'حلويات', 'عربي'],
      rating: 4.6,
      reviewsCount: 95,
      status: 'active',
      createdAt: '2025-02-15T09:30:00',
      lastActive: '2025-04-06T14:45:00',
      ordersCount: 380,
      revenue: 3800000
    },
    {
      id: 3,
      name: 'مطعم حلب',
      email: 'aleppo@example.com',
      phone: '+963 11 3456789',
      address: 'دمشق، شارع الثورة، بناء رقم 5',
      logo: 'https://via.placeholder.com/150',
      categories: ['كبة', 'مقبلات', 'عربي'],
      rating: 4.5,
      reviewsCount: 85,
      status: 'active',
      createdAt: '2025-02-20T10:15:00',
      lastActive: '2025-04-06T13:20:00',
      ordersCount: 320,
      revenue: 3200000
    },
    {
      id: 4,
      name: 'مطعم البيت',
      email: 'albait@example.com',
      phone: '+963 11 4567890',
      address: 'دمشق، شارع العابد، بناء رقم 3',
      logo: 'https://via.placeholder.com/150',
      categories: ['أكلات منزلية', 'عربي'],
      rating: 0,
      reviewsCount: 0,
      status: 'pending',
      createdAt: '2025-04-05T11:30:00',
      ordersCount: 0,
      revenue: 0
    },
    {
      id: 5,
      name: 'مطعم الشرق',
      email: 'east@example.com',
      phone: '+963 11 5678901',
      address: 'دمشق، شارع الميدان، بناء رقم 9',
      logo: 'https://via.placeholder.com/150',
      categories: ['هندي', 'آسيوي'],
      rating: 4.2,
      reviewsCount: 45,
      status: 'active',
      createdAt: '2025-03-01T12:00:00',
      lastActive: '2025-04-05T18:30:00',
      ordersCount: 180,
      revenue: 1800000
    },
    {
      id: 6,
      name: 'مطعم إيطاليانو',
      email: 'italiano@example.com',
      phone: '+963 11 6789012',
      address: 'دمشق، شارع الفردوس، بناء رقم 15',
      logo: 'https://via.placeholder.com/150',
      categories: ['بيتزا', 'باستا', 'إيطالي'],
      rating: 4.4,
      reviewsCount: 65,
      status: 'active',
      createdAt: '2025-03-10T14:15:00',
      lastActive: '2025-04-06T11:45:00',
      ordersCount: 250,
      revenue: 2500000
    },
    {
      id: 7,
      name: 'مطعم الصياد',
      email: 'fisherman@example.com',
      phone: '+963 11 7890123',
      address: 'دمشق، شارع الروضة، بناء رقم 8',
      logo: 'https://via.placeholder.com/150',
      categories: ['سمك', 'مأكولات بحرية'],
      rating: 4.7,
      reviewsCount: 75,
      status: 'active',
      createdAt: '2025-03-15T09:45:00',
      lastActive: '2025-04-06T10:20:00',
      ordersCount: 280,
      revenue: 2800000
    },
    {
      id: 8,
      name: 'مطعم الفلافل',
      email: 'falafel@example.com',
      phone: '+963 11 8901234',
      address: 'دمشق، شارع الزاهرة، بناء رقم 4',
      logo: 'https://via.placeholder.com/150',
      categories: ['فلافل', 'سناك', 'عربي'],
      rating: 4.3,
      reviewsCount: 55,
      status: 'inactive',
      createdAt: '2025-03-20T11:30:00',
      lastActive: '2025-04-01T15:40:00',
      ordersCount: 150,
      revenue: 1500000
    }
  ]);
  
  // حالة التصفية
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: ''
  });
  
  // حالة المطعم المحدد للتعديل
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  
  // قائمة الفئات المتاحة
  const [categories, setCategories] = useState<string[]>([
    'عربي', 'شاورما', 'مشاوي', 'فطور', 'حلويات', 'كبة', 'مقبلات', 'أكلات منزلية',
    'هندي', 'آسيوي', 'بيتزا', 'باستا', 'إيطالي', 'سمك', 'مأكولات بحرية', 'فلافل', 'سناك'
  ]);
  
  // تصفية المطاعم حسب المعايير
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesStatus = filters.status === 'all' || restaurant.status === filters.status;
    const matchesCategory = filters.category === 'all' || restaurant.categories.includes(filters.category);
    const matchesSearch = 
      restaurant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      restaurant.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      restaurant.phone.includes(filters.search) ||
      restaurant.address.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesSearch;
  });
  
  // ترتيب المطاعم حسب الحالة ثم التقييم
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    // المطاعم قيد المراجعة أولاً
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    
    // ثم حسب التقييم (من الأعلى للأدنى)
    return b.rating - a.rating;
  });
  
  // ترجمة حالة المطعم
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return { label: 'نشط', color: 'bg-green-100 text-green-800' };
      case 'inactive': return { label: 'غير نشط', color: 'bg-gray-100 text-gray-800' };
      case 'pending': return { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' };
      case 'rejected': return { label: 'مرفوض', color: 'bg-red-100 text-red-800' };
      default: return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // تنسيق التاريخ والوقت
  const formatDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) return 'غير متوفر';
    
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
  
  // تغيير حالة المطعم
  const changeRestaurantStatus = (restaurantId: number, newStatus: 'active' | 'inactive' | 'pending' | 'rejected') => {
    // في التطبيق الحقيقي، سيتم تحديث قاعدة البيانات
    // هنا نقوم بتحديث الحالة المحلية فقط
    const updatedRestaurants = restaurants.map(restaurant => {
      if (restaurant.id === restaurantId) {
        return { ...restaurant, status: newStatus };
      }
      return restaurant;
    });
    
    setRestaurants(updatedRestaurants);
    setSelectedRestaurant(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">لوحة تحكم المدير - إدارة المطاعم</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/admin/dashboard" className="text-gray-600 hover:text-primary-600">لوحة التحكم</a>
            <a href="/admin/tracking" className="text-gray-600 hover:text-primary-600">تتبع الطلبات</a>
            <a href="/admin/users" className="text-gray-600 hover:text-primary-600">المستخدمين</a>
            <a href="/admin/settings" className="text-gray-600 hover:text-primary-600">الإعدادات</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">إدارة المطاعم</h1>
          <p className="mt-2 text-gray-600">إدارة جميع المطاعم في النظام ومراجعة طلبات الانضمام الجديدة</p>
        </div>
        
        {/* أدوات البحث والتصفية */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="ابحث بالاسم، العنوان، البريد الإلكتروني..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
              <select
                id="category"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">جميع الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select
                id="status"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="pending">قيد المراجعة</option>
                <option value="rejected">مرفوض</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ status: 'all', category: 'all', search: '' })}
                className="btn-outline w-full"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          </div>
        </div>
        
        {/* قائمة المطاعم */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.length === 0 ? (
            <div className="col-span-3 bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">لا توجد مطاعم تطابق معايير البحث الحالية</p>
            </div>
          ) : (
            sortedRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative">
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    {restaurant.logo ? (
                      <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(restaurant.status).color}`}>
                      {getStatusLabel(restaurant.status).label}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{restaurant.name}</h3>
                    {restaurant.rating > 0 && (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="mr-1 text-gray-900">{restaurant.rating}</span>
                        <span className="text-xs text-gray-500">({restaurant.reviewsCount})</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{restaurant.address}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {restaurant.categories.map((category) => (
                      <span key={category} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">الطلبات</p>
                      <p className="font-medium">{formatCurrency(restaurant.ordersCount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">الإيرادات</p>
                      <p className="font-medium">{formatCurrency(restaurant.revenue)} ل.س</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedRestaurant(selectedRestaurant === restaurant.id ? null : restaurant.id)}
                      className="btn-primary-sm"
                    >
                      إدارة
                    </button>
                    <a
                      href={`/admin/restaurants/${restaurant.id}`}
                      className="text-gray-600 hover:text-gray-900 text-sm"
                    >
                      عرض التفاصيل
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
      
      {/* نافذة منبثقة لإدارة المطعم */}
      {selectedRestaurant !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            {(() => {
              const restaurant = restaurants.find(r => r.id === selectedRestaurant);
              if (!restaurant) return null;
              
              return (
                <>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">إدارة المطعم</h3>
                      <button
                        onClick={() => setSelectedRestaurant(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden ml-4">
                          {restaurant.logo ? (
                            <img
                              src={restaurant.logo}
                              alt={restaurant.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{restaurant.name}</h4>
                          <p className="text-sm text-gray-500">{restaurant.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">الهاتف</p>
                          <p className="font-medium">{restaurant.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">الحالة الحالية</p>
                          <p className="font-medium">{getStatusLabel(restaurant.status).label}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">العنوان</p>
                        <p className="font-medium">{restaurant.address}</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">الفئات</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {restaurant.categories.map((category) => (
                            <span key={category} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">تغيير حالة المطعم</h4>
                    
                    <div className="space-y-3">
                      {restaurant.status === 'pending' && (
                        <button
                          onClick={() => changeRestaurantStatus(restaurant.id, 'active')}
                          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          الموافقة وتنشيط المطعم
                        </button>
                      )}
                      
                      {restaurant.status === 'pending' && (
                        <button
                          onClick={() => changeRestaurantStatus(restaurant.id, 'rejected')}
                          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          رفض طلب الانضمام
                        </button>
                      )}
                      
                      {restaurant.status !== 'pending' && restaurant.status !== 'active' && (
                        <button
                          onClick={() => changeRestaurantStatus(restaurant.id, 'active')}
                          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          تنشيط المطعم
                        </button>
                      )}
                      
                      {restaurant.status !== 'pending' && restaurant.status !== 'inactive' && (
                        <button
                          onClick={() => changeRestaurantStatus(restaurant.id, 'inactive')}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          تعطيل المطعم
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurantsManagement;
