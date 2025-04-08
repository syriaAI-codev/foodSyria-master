import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabaseClient';

// صفحة لوحة تحكم المدير للتتبع في الوقت الفعلي
const AdminTrackingDashboard: React.FC = () => {
  // حالة الطلبات النشطة
  const [activeOrders, setActiveOrders] = useState<Array<{
    id: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
    restaurant: {
      id: number;
      name: string;
    };
    customer: {
      name: string;
      address: string;
    };
    deliveryDriver?: {
      id: number;
      name: string;
      phone: string;
      current_location?: { lat: number; lng: number };
    };
    createdAt: string;
    updatedAt: string;
  }>>([
    {
      id: 1001,
      status: 'on_the_way',
      restaurant: {
        id: 1,
        name: 'مطعم الشام'
      },
      customer: {
        name: 'محمد أحمد',
        address: 'دمشق، شارع الحمراء، بناء رقم 7، طابق 3'
      },
      deliveryDriver: {
        id: 1,
        name: 'رامي علي',
        phone: '+963 955 111222',
        current_location: { lat: 33.5180, lng: 36.2840 }
      },
      createdAt: '2025-04-06T14:30:00',
      updatedAt: '2025-04-06T14:45:00'
    },
    {
      id: 1002,
      status: 'preparing',
      restaurant: {
        id: 2,
        name: 'مطعم دمشق'
      },
      customer: {
        name: 'أحمد محمود',
        address: 'دمشق، شارع الميدان، بناء رقم 12، طابق 1'
      },
      createdAt: '2025-04-06T14:45:00',
      updatedAt: '2025-04-06T14:50:00'
    },
    {
      id: 1003,
      status: 'pending',
      restaurant: {
        id: 3,
        name: 'مطعم حلب'
      },
      customer: {
        name: 'علي حسن',
        address: 'دمشق، شارع العابد، بناء رقم 5، طابق 2'
      },
      createdAt: '2025-04-06T15:00:00',
      updatedAt: '2025-04-06T15:00:00'
    }
  ]);
  
  // حالة السائقين المتاحين
  const [availableDrivers, setAvailableDrivers] = useState<Array<{
    id: number;
    name: string;
    phone: string;
    available: boolean;
    current_location?: { lat: number; lng: number };
    current_order_id?: number;
    lastActive: string;
  }>>([
    {
      id: 1,
      name: 'رامي علي',
      phone: '+963 955 111222',
      available: true,
      current_location: { lat: 33.5180, lng: 36.2840 },
      current_order_id: 1001,
      lastActive: '2025-04-06T15:05:00'
    },
    {
      id: 2,
      name: 'سامر محمد',
      phone: '+963 955 222333',
      available: true,
      current_location: { lat: 33.5100, lng: 36.2900 },
      lastActive: '2025-04-06T15:04:00'
    },
    {
      id: 3,
      name: 'خالد أحمد',
      phone: '+963 955 333444',
      available: false,
      lastActive: '2025-04-06T14:30:00'
    }
  ]);
  
  // حالة التصفية
  const [filterStatus, setFilterStatus] = useState<string>('all');
  // حالة البحث
  const [searchTerm, setSearchTerm] = useState<string>('');
  // حالة الطلب المحدد
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  
  // إعداد اشتراك Supabase Realtime
  useEffect(() => {
    // في التطبيق الحقيقي، سيتم استخدام هذا لتلقي تحديثات الطلبات والسائقين
    const setupRealtimeSubscription = async () => {
      try {
        // مثال على اشتراك Supabase Realtime للطلبات
        // const ordersSubscription = supabase
        //   .channel('orders-changes')
        //   .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, handleOrdersChange)
        //   .subscribe();
        
        // مثال على اشتراك Supabase Realtime للسائقين
        // const driversSubscription = supabase
        //   .channel('drivers-changes')
        //   .on('postgres_changes', { event: '*', schema: 'public', table: 'delivery_drivers' }, handleDriversChange)
        //   .subscribe();
        
        // return () => {
        //   ordersSubscription.unsubscribe();
        //   driversSubscription.unsubscribe();
        // };
      } catch (err) {
        console.error('Error setting up realtime subscription:', err);
      }
    };
    
    setupRealtimeSubscription();
    
    // محاكاة تحديثات في الوقت الفعلي
    const interval = setInterval(() => {
      // تحديث موقع السائق الأول
      if (availableDrivers.length > 0 && availableDrivers[0].current_location) {
        const updatedDrivers = [...availableDrivers];
        const driver = { ...updatedDrivers[0] };
        
        // تحريك السائق قليلاً
        if (driver.current_location) {
          driver.current_location = {
            lat: driver.current_location.lat + (Math.random() - 0.5) * 0.001,
            lng: driver.current_location.lng + (Math.random() - 0.5) * 0.001
          };
        }
        
        driver.lastActive = new Date().toISOString();
        updatedDrivers[0] = driver;
        setAvailableDrivers(updatedDrivers);
        
        // تحديث موقع السائق في الطلب النشط
        const updatedOrders = [...activeOrders];
        const orderIndex = updatedOrders.findIndex(o => o.id === driver.current_order_id);
        if (orderIndex !== -1 && updatedOrders[orderIndex].deliveryDriver) {
          updatedOrders[orderIndex] = {
            ...updatedOrders[orderIndex],
            deliveryDriver: {
              ...updatedOrders[orderIndex].deliveryDriver!,
              current_location: driver.current_location
            },
            updatedAt: new Date().toISOString()
          };
          setActiveOrders(updatedOrders);
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeOrders, availableDrivers]);
  
  // تصفية الطلبات حسب الحالة والبحث
  const filteredOrders = activeOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toString().includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });
  
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
  
  // حساب الوقت المنقضي منذ آخر نشاط
  const getTimeElapsed = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'الآن';
    } else if (diffMins === 1) {
      return 'منذ دقيقة واحدة';
    } else if (diffMins < 60) {
      return `منذ ${diffMins} دقيقة`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours === 1) {
        return 'منذ ساعة واحدة';
      } else {
        return `منذ ${diffHours} ساعة`;
      }
    }
  };
  
  // تعيين سائق للطلب
  const assignDriverToOrder = (orderId: number, driverId: number) => {
    // في التطبيق الحقيقي، سيتم تحديث قاعدة البيانات
    // هنا نقوم بتحديث الحالة المحلية فقط
    const updatedOrders = [...activeOrders];
    const orderIndex = updatedOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
      const driver = availableDrivers.find(d => d.id === driverId);
      
      if (driver) {
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: 'on_the_way',
          deliveryDriver: {
            id: driver.id,
            name: driver.name,
            phone: driver.phone,
            current_location: driver.current_location
          },
          updatedAt: new Date().toISOString()
        };
        
        setActiveOrders(updatedOrders);
        
        // تحديث حالة السائق
        const updatedDrivers = [...availableDrivers];
        const driverIndex = updatedDrivers.findIndex(d => d.id === driverId);
        
        if (driverIndex !== -1) {
          updatedDrivers[driverIndex] = {
            ...updatedDrivers[driverIndex],
            current_order_id: orderId
          };
          
          setAvailableDrivers(updatedDrivers);
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">لوحة تحكم المدير - تتبع الطلبات</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/admin/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/admin/users" className="text-gray-600 hover:text-primary-600">المستخدمين</a>
            <a href="/admin/dashboard" className="text-gray-600 hover:text-primary-600">الإحصائيات</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">تتبع الطلبات في الوقت الفعلي</h1>
          <p className="mt-2 text-gray-600">مراقبة وإدارة الطلبات النشطة والسائقين المتاحين</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* أدوات البحث والتصفية */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
                  <input
                    type="text"
                    id="search"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="ابحث عن اسم المطعم، العميل، رقم الطلب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select
                    id="status"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="confirmed">تم التأكيد</option>
                    <option value="preparing">قيد التحضير</option>
                    <option value="ready">جاهز للتوصيل</option>
                    <option value="on_the_way">في الطريق</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilterStatus('all');
                      setSearchTerm('');
                    }}
                    className="btn-outline w-full"
                  >
                    إعادة تعيين الفلاتر
                  </button>
                </div>
              </div>
            </div>
            
            {/* قائمة الطلبات النشطة */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">الطلبات النشطة ({filteredOrders.length})</h2>
              </div>
              
              {filteredOrders.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">لا توجد طلبات نشطة تطابق معايير البحث الحالية</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900 ml-2">طلب #{order.id}</h3>
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color}`}>
                              {getStatusLabel(order.status).label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            من {order.restaurant.name} إلى {order.customer.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            تم الإنشاء: {formatDateTime(order.createdAt)}
                            {order.updatedAt !== order.createdAt && ` • آخر تحديث: ${formatDateTime(order.updatedAt)}`}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          {order.deliveryDriver ? (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">السائق:</span> {order.deliveryDriver.name}
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                              className="btn-primary-sm"
                            >
                              تعيين سائق
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {selectedOrder === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <h4 className="text-sm font-medium text-gray-900 mb-2">السائقين المتاحين</h4>
                          <div className="space-y-2">
                            {availableDrivers
                              .filter(driver => driver.available && !driver.current_order_id)
                              .map(driver => (
                                <div key={driver.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                  <div>
                                    <p className="font-medium">{driver.name}</p>
                                    <p className="text-xs text-gray-500">آخر نشاط: {getTimeElapsed(driver.lastActive)}</p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      assignDriverToOrder(order.id, driver.id);
                                      setSelectedOrder(null);
                                    }}
                                    className="btn-outline-sm"
                                  >
                                    تعيين
                                  </button>
                                </div>
                              ))}
                            
                            {availableDrivers.filter(driver => driver.available && !driver.current_order_id).length === 0 && (
                              <p className="text-sm text-gray-500">لا يوجد سائقين متاحين حالياً</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            {/* قائمة السائقين */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">السائقين ({availableDrivers.length})</h2>
              </div>
              
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
                {availableDrivers.map((driver) => (
                  <div key={driver.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                          <p className="text-xs text-gray-500">{driver.phone}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        driver.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {driver.available ? 'متاح' : 'غير متاح'}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>آخر نشاط: {getTimeElapsed(driver.lastActive)}</span>
                      {driver.current_order_id && (
                        <span className="text-primary-600">
                          يعمل على الطلب #{driver.current_order_id}
                        </span>
                      )}
                    </div>
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

export default AdminTrackingDashboard;
