import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// صفحة إدارة الطلبات للمطعم
const OrdersManagement: React.FC = () => {
  const navigate = useNavigate();
  
  // حالة الطلبات
  const [orders, setOrders] = useState<Array<{
    id: number;
    customer: {
      name: string;
      phone: string;
      address: string;
    };
    items: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
    }>;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
    total: number;
    deliveryFee: number;
    paymentMethod: 'cash' | 'card';
    createdAt: string;
    notes: string;
    deliveryDriver?: {
      id: number;
      name: string;
      phone: string;
    };
  }>>([
    {
      id: 1001,
      customer: {
        name: 'محمد أحمد',
        phone: '+963 955 123456',
        address: 'دمشق، شارع الثورة، بناء رقم 15، طابق 3'
      },
      items: [
        { id: 101, name: 'حمص', price: 2500, quantity: 1 },
        { id: 201, name: 'كباب حلبي', price: 12000, quantity: 2 },
        { id: 301, name: 'عصير ليمون', price: 1500, quantity: 2 }
      ],
      status: 'pending',
      total: 29500,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T14:30:00',
      notes: 'الرجاء إضافة ثوم إضافي مع الحمص'
    },
    {
      id: 1002,
      customer: {
        name: 'سارة خالد',
        phone: '+963 955 654321',
        address: 'دمشق، شارع الحمراء، بناء رقم 7، طابق 1'
      },
      items: [
        { id: 102, name: 'متبل', price: 2500, quantity: 1 },
        { id: 202, name: 'شيش طاووق', price: 10000, quantity: 1 }
      ],
      status: 'confirmed',
      total: 12500,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T14:15:00',
      notes: ''
    },
    {
      id: 1003,
      customer: {
        name: 'أحمد محمد',
        phone: '+963 955 987654',
        address: 'دمشق، شارع بغداد، بناء رقم 22، طابق 5'
      },
      items: [
        { id: 103, name: 'تبولة', price: 3000, quantity: 1 },
        { id: 203, name: 'مشاوي مشكلة', price: 25000, quantity: 1 },
        { id: 302, name: 'عصير برتقال', price: 2000, quantity: 2 }
      ],
      status: 'preparing',
      total: 32000,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T13:45:00',
      notes: 'الرجاء عدم إضافة بصل في التبولة'
    },
    {
      id: 1004,
      customer: {
        name: 'ليلى عمر',
        phone: '+963 955 456789',
        address: 'دمشق، شارع الفردوس، بناء رقم 10، طابق 2'
      },
      items: [
        { id: 201, name: 'كباب حلبي', price: 12000, quantity: 2 },
        { id: 303, name: 'مياه معدنية', price: 500, quantity: 2 }
      ],
      status: 'ready',
      total: 25000,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T13:30:00',
      notes: ''
    },
    {
      id: 1005,
      customer: {
        name: 'عمر خالد',
        phone: '+963 955 789123',
        address: 'دمشق، شارع العابد، بناء رقم 5، طابق 4'
      },
      items: [
        { id: 102, name: 'متبل', price: 2500, quantity: 1 },
        { id: 103, name: 'تبولة', price: 3000, quantity: 1 },
        { id: 202, name: 'شيش طاووق', price: 10000, quantity: 1 },
        { id: 301, name: 'عصير ليمون', price: 1500, quantity: 1 }
      ],
      status: 'on_the_way',
      total: 17000,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T13:00:00',
      notes: '',
      deliveryDriver: {
        id: 1,
        name: 'رامي علي',
        phone: '+963 955 111222'
      }
    },
    {
      id: 1006,
      customer: {
        name: 'نور أحمد',
        phone: '+963 955 321654',
        address: 'دمشق، شارع الجلاء، بناء رقم 18، طابق 3'
      },
      items: [
        { id: 203, name: 'مشاوي مشكلة', price: 25000, quantity: 1 },
        { id: 302, name: 'عصير برتقال', price: 2000, quantity: 2 }
      ],
      status: 'delivered',
      total: 29000,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T12:30:00',
      notes: '',
      deliveryDriver: {
        id: 2,
        name: 'سامر محمد',
        phone: '+963 955 333444'
      }
    },
    {
      id: 1007,
      customer: {
        name: 'فادي حسن',
        phone: '+963 955 654987',
        address: 'دمشق، شارع الروضة، بناء رقم 9، طابق 1'
      },
      items: [
        { id: 101, name: 'حمص', price: 2500, quantity: 1 },
        { id: 102, name: 'متبل', price: 2500, quantity: 1 }
      ],
      status: 'cancelled',
      total: 5000,
      deliveryFee: 2000,
      paymentMethod: 'cash',
      createdAt: '2025-04-06T12:15:00',
      notes: 'تم إلغاء الطلب من قبل العميل'
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
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.phone.includes(searchTerm) ||
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
  
  // معالج تحديث حالة الطلب
  const handleUpdateStatus = (orderId: number, newStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled') => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  
  // معالج تعيين سائق توصيل
  const handleAssignDriver = (orderId: number, driverId: number, driverName: string, driverPhone: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {
        ...order,
        deliveryDriver: {
          id: driverId,
          name: driverName,
          phone: driverPhone
        },
        status: 'on_the_way'
      } : order
    ));
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
  
  // حساب إجمالي الطلب
  const calculateOrderTotal = (order: any) => {
    const itemsTotal = order.items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    return itemsTotal + order.deliveryFee;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/restaurant/dashboard" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">إدارة الطلبات</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/restaurant/menu" className="text-gray-600 hover:text-primary-600">إدارة القائمة</a>
            <a href="/restaurant/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
            <button className="btn-outline">تسجيل الخروج</button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الطلبات</h1>
          <p className="mt-2 text-gray-600">إدارة وتتبع طلبات العملاء</p>
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
                placeholder="ابحث عن اسم العميل، رقم الهاتف، رقم الطلب..."
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم الطلب
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العميل
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ والوقت
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={selectedOrder === order.id ? 'bg-primary-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.total + order.deliveryFee} ل.س
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color}`}>
                        {getStatusLabel(order.status).label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {selectedOrder === order.id ? 'إغلاق' : 'عرض التفاصيل'}
                      </button>
                    </td>
                  </tr>
                ))}
                
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      لا توجد طلبات مطابقة للفلاتر المحددة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* تفاصيل الطلب المحدد */}
        {selectedOrder !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-white rounded-lg shadow-md overflow-hidden"
          >
            {(() => {
              const order = orders.find(o => o.id === selectedOrder);
              if (!order) return null;
              
              return (
                <>
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-900">تفاصيل الطلب #{order.id}</h2>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color}`}>
                        {getStatusLabel(order.status).label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-2">معلومات العميل</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="mb-2">
                            <span className="text-gray-600">الاسم:</span>
                            <span className="text-gray-900 mr-1">{order.customer.name}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-gray-600">رقم الهاتف:</span>
                            <span className="text-gray-900 mr-1">{order.customer.phone}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">العنوان:</span>
                            <span className="text-gray-900 mr-1">{order.customer.address}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-2">معلومات الطلب</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="mb-2">
                            <span className="text-gray-600">تاريخ الطلب:</span>
                            <span className="text-gray-900 mr-1">{formatDateTime(order.createdAt)}</span>
                          </div>
                          <div className="mb-2">
                            <span className="text-gray-600">طريقة الدفع:</span>
                            <span className="text-gray-900 mr-1">{order.paymentMethod === 'cash' ? 'نقداً عند الاستلام' : 'بطاقة ائتمان'}</span>
                          </div>
                          {order.notes && (
                            <div>
                              <span className="text-gray-600">ملاحظات:</span>
                              <span className="text-gray-900 mr-1">{order.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-md font-medium text-gray-900 mb-2">عناصر الطلب</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <div key={index} className="py-3 flex justify-between">
                            <div>
                              <span className="text-gray-900">{item.name}</span>
                              <span className="text-gray-600 mr-2">x{item.quantity}</span>
                            </div>
                            <span className="text-gray-900">{item.price * item.quantity} ل.س</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-3 mt-3">
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
                    
                    {order.deliveryDriver && (
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-900 mb-2">معلومات التوصيل</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                              {order.deliveryDriver.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{order.deliveryDriver.name}</p>
                              <p className="text-xs text-gray-500">{order.deliveryDriver.phone}</p>
                            </div>
                            <a
                              href={`tel:${order.deliveryDriver.phone}`}
                              className="mr-auto bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              اتصال
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">تحديث حالة الطلب</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {order.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                                className="btn-primary-sm"
                              >
                                تأكيد الطلب
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                                className="btn-outline-sm text-red-600 border-red-600 hover:bg-red-50"
                              >
                                إلغاء الطلب
                              </button>
                            </>
                          )}
                          
                          {order.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'preparing')}
                              className="btn-primary-sm"
                            >
                              بدء التحضير
                            </button>
                          )}
                          
                          {order.status === 'preparing' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'ready')}
                              className="btn-primary-sm"
                            >
                              جاهز للتوصيل
                            </button>
                          )}
                          
                          {order.status === 'ready' && (
                            <button
                              onClick={() => {
                                // في التطبيق الحقيقي، سيتم عرض قائمة بالسائقين المتاحين
                                handleAssignDriver(order.id, 1, 'رامي علي', '+963 955 111222');
                              }}
                              className="btn-primary-sm"
                            >
                              تعيين سائق توصيل
                            </button>
                          )}
                          
                          {order.status === 'on_the_way' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'delivered')}
                              className="btn-primary-sm"
                            >
                              تأكيد التوصيل
                            </button>
                          )}
                          
                          {(order.status !== 'delivered' && order.status !== 'cancelled') && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="btn-outline-sm text-red-600 border-red-600 hover:bg-red-50"
                            >
                              إلغاء الطلب
                            </button>
                          )}
                        </div>
                        
                        {order.status === 'ready' && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">اختر سائق توصيل:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div
                                onClick={() => handleAssignDriver(order.id, 1, 'رامي علي', '+963 955 111222')}
                                className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                              >
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-2">
                                    ر
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">رامي علي</p>
                                    <p className="text-xs text-gray-500">+963 955 111222</p>
                                  </div>
                                </div>
                              </div>
                              <div
                                onClick={() => handleAssignDriver(order.id, 2, 'سامر محمد', '+963 955 333444')}
                                className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                              >
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-2">
                                    س
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">سامر محمد</p>
                                    <p className="text-xs text-gray-500">+963 955 333444</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default OrdersManagement;
