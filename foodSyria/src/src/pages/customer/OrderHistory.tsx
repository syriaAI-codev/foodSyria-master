import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// صفحة عرض تاريخ الطلبات السابقة
const OrderHistory: React.FC = () => {
  // حالة الطلبات
  const [orders, setOrders] = useState<Array<{
    id: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
    restaurant: {
      id: number;
      name: string;
      logo: string;
    };
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    total: number;
    deliveryFee: number;
    createdAt: string;
  }>>([
    {
      id: 1001,
      status: 'delivered',
      restaurant: {
        id: 1,
        name: 'مطعم الشام',
        logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
      },
      items: [
        { id: 101, name: 'حمص', price: 2500, quantity: 1 },
        { id: 201, name: 'كباب حلبي', price: 12000, quantity: 2 },
        { id: 301, name: 'عصير ليمون', price: 1500, quantity: 2 }
      ],
      total: 29500,
      deliveryFee: 2000,
      createdAt: '2025-04-05T14:30:00'
    },
    {
      id: 1002,
      status: 'delivered',
      restaurant: {
        id: 2,
        name: 'مطعم دمشق',
        logo: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
      },
      items: [
        { id: 102, name: 'متبل', price: 2500, quantity: 1 },
        { id: 202, name: 'شيش طاووق', price: 10000, quantity: 1 }
      ],
      total: 12500,
      deliveryFee: 2000,
      createdAt: '2025-04-04T18:15:00'
    },
    {
      id: 1003,
      status: 'cancelled',
      restaurant: {
        id: 3,
        name: 'مطعم حلب',
        logo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80'
      },
      items: [
        { id: 103, name: 'تبولة', price: 3000, quantity: 1 },
        { id: 203, name: 'مشاوي مشكلة', price: 25000, quantity: 1 },
        { id: 302, name: 'عصير برتقال', price: 2000, quantity: 2 }
      ],
      total: 32000,
      deliveryFee: 2000,
      createdAt: '2025-04-03T13:45:00'
    },
    {
      id: 1004,
      status: 'delivered',
      restaurant: {
        id: 1,
        name: 'مطعم الشام',
        logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
      },
      items: [
        { id: 201, name: 'كباب حلبي', price: 12000, quantity: 2 },
        { id: 303, name: 'مياه معدنية', price: 500, quantity: 2 }
      ],
      total: 25000,
      deliveryFee: 2000,
      createdAt: '2025-04-02T13:30:00'
    },
    {
      id: 1005,
      status: 'delivered',
      restaurant: {
        id: 2,
        name: 'مطعم دمشق',
        logo: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
      },
      items: [
        { id: 102, name: 'متبل', price: 2500, quantity: 1 },
        { id: 103, name: 'تبولة', price: 3000, quantity: 1 },
        { id: 202, name: 'شيش طاووق', price: 10000, quantity: 1 },
        { id: 301, name: 'عصير ليمون', price: 1500, quantity: 1 }
      ],
      total: 17000,
      deliveryFee: 2000,
      createdAt: '2025-04-01T13:00:00'
    }
  ]);
  
  // حالة التصفية
  const [filterStatus, setFilterStatus] = useState<string>('all');
  // حالة البحث
  const [searchTerm, setSearchTerm] = useState<string>('');
  // حالة الطلب المحدد
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  
  // تصفية الطلبات حسب الحالة والبحث
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
  
  // معالج طلب مشابه
  const handleReorder = (orderId: number) => {
    // في التطبيق الحقيقي، سيتم إعادة توجيه المستخدم إلى صفحة المطعم مع إضافة العناصر إلى السلة
    alert(`سيتم إعادة طلب العناصر من الطلب رقم ${orderId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">طلباتي</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/cart" className="text-gray-600 hover:text-primary-600">سلة التسوق</a>
            <a href="/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">طلباتي</h1>
          <p className="mt-2 text-gray-600">عرض وتتبع جميع طلباتك السابقة</p>
        </div>
        
        {/* أدوات البحث والتصفية */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="ابحث عن اسم المطعم، رقم الطلب..."
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
                <option value="delivered">تم التوصيل</option>
                <option value="cancelled">ملغي</option>
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
        
        {/* قائمة الطلبات */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات مطابقة</h3>
            <p className="text-gray-500 mb-4">لم يتم العثور على طلبات تطابق معايير البحث الحالية</p>
            <a href="/restaurants" className="btn-primary">
              تصفح المطاعم
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden ml-3">
                      <img src={order.restaurant.logo} alt={order.restaurant.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{order.restaurant.name}</h3>
                      <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color} ml-4`}>
                      {getStatusLabel(order.status).label}
                    </span>
                    <span className="text-lg font-bold text-gray-900">{order.total + order.deliveryFee} ل.س</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">رقم الطلب: <span className="font-medium">#{order.id}</span></p>
                      <p className="text-sm text-gray-600">
                        {order.items.length} عناصر: {order.items.map(item => `${item.name} (${item.quantity})`).join('، ')}
                      </p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      {order.status === 'delivered' && (
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="btn-outline-sm"
                        >
                          إعادة الطلب
                        </button>
                      )}
                      {['pending', 'confirmed', 'preparing', 'ready', 'on_the_way'].includes(order.status) && (
                        <a
                          href={`/order-tracking/${order.id}`}
                          className="btn-primary-sm"
                        >
                          تتبع الطلب
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="btn-outline-sm"
                      >
                        {selectedOrder === order.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                      </button>
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
                      <h4 className="text-md font-medium text-gray-900 mb-2">تفاصيل الطلب</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <span className="text-gray-900">{item.name}</span>
                              <span className="text-gray-600 mr-2">x{item.quantity}</span>
                            </div>
                            <span className="text-gray-900">{item.price * item.quantity} ل.س</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">المجموع الفرعي:</span>
                            <span className="text-gray-900">{order.total} ل.س</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-600">رسوم التوصيل:</span>
                            <span className="text-gray-900">{order.deliveryFee} ل.س</span>
                          </div>
                          <div className="flex justify-between font-bold">
                            <span>الإجمالي:</span>
                            <span>{order.total + order.deliveryFee} ل.س</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistory;
