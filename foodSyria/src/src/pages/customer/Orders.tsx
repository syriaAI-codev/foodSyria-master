import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// مكونات مشتركة
const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">فود سوريا</Link>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <Link to="/orders" className="text-gray-600 hover:text-primary-600">طلباتي</Link>
          <Link to="/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</Link>
          <button className="btn-outline">تسجيل الخروج</button>
        </div>
      </div>
    </header>
  );
};

// واجهة الطلب
interface Order {
  id: number;
  restaurantName: string;
  restaurantImage: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
  deliveryAddress: string;
  deliveryTime?: string;
  deliveryPerson?: {
    name: string;
    phone: string;
    rating: number;
  };
}

// مكون حالة الطلب
const OrderStatus: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' };
      case 'confirmed':
        return { label: 'تم التأكيد', color: 'bg-blue-100 text-blue-800' };
      case 'preparing':
        return { label: 'قيد التحضير', color: 'bg-indigo-100 text-indigo-800' };
      case 'on_the_way':
        return { label: 'في الطريق', color: 'bg-purple-100 text-purple-800' };
      case 'delivered':
        return { label: 'تم التوصيل', color: 'bg-green-100 text-green-800' };
      case 'cancelled':
        return { label: 'ملغي', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const { label, color } = getStatusInfo();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

// مكون بطاقة الطلب
const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <div className="flex items-start">
          <img 
            src={order.restaurantImage} 
            alt={order.restaurantName} 
            className="w-16 h-16 object-cover rounded-md ml-4"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900">{order.restaurantName}</h3>
              <OrderStatus status={order.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1">رقم الطلب: #{order.id}</p>
            <p className="text-sm text-gray-600">{order.date}</p>
            <div className="mt-2 flex justify-between items-center">
              <p className="font-medium text-gray-900">المجموع: {order.total} ل.س</p>
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {expanded ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
              </button>
            </div>
          </div>
        </div>

        {expanded && (
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-md font-medium text-gray-900 mb-2">تفاصيل الطلب</h4>
            <ul className="space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{item.price * item.quantity} ل.س</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-md font-medium text-gray-900 mb-2">معلومات التوصيل</h4>
              <p className="text-sm text-gray-600">العنوان: {order.deliveryAddress}</p>
              {order.deliveryTime && (
                <p className="text-sm text-gray-600">وقت التوصيل المتوقع: {order.deliveryTime}</p>
              )}
              
              {order.deliveryPerson && (
                <div className="mt-2">
                  <h4 className="text-md font-medium text-gray-900 mb-1">عامل التوصيل</h4>
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-gray-700 font-medium ml-2">
                      {order.deliveryPerson.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.deliveryPerson.name}</p>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs text-gray-600 mr-1">{order.deliveryPerson.rating}</span>
                      </div>
                    </div>
                    <a 
                      href={`tel:${order.deliveryPerson.phone}`}
                      className="mr-auto bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      اتصال
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {order.status === 'on_the_way' && (
              <div className="mt-4">
                <button className="btn-primary w-full">تتبع الطلب</button>
              </div>
            )}
            
            {order.status === 'delivered' && (
              <div className="mt-4">
                <button className="btn-primary w-full">تقييم الطلب</button>
              </div>
            )}
            
            {(order.status === 'pending' || order.status === 'confirmed') && (
              <div className="mt-4">
                <button className="btn-outline text-red-600 border-red-600 hover:bg-red-50 w-full">إلغاء الطلب</button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// صفحة الطلبات
const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  
  // بيانات وهمية للطلبات
  const orders: Order[] = [
    {
      id: 1001,
      restaurantName: 'مطعم الشام',
      restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      status: 'on_the_way',
      items: [
        { name: 'شاورما دجاج', quantity: 2, price: 3500 },
        { name: 'حمص', quantity: 1, price: 1800 }
      ],
      total: 8800,
      date: '06 أبريل 2025 - 14:30',
      deliveryAddress: 'دمشق، المزة، شارع الفردوس، بناء رقم 12',
      deliveryTime: '15:15',
      deliveryPerson: {
        name: 'أحمد محمد',
        phone: '+963912345678',
        rating: 4.8
      }
    },
    {
      id: 1000,
      restaurantName: 'بيتزا هت',
      restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      status: 'confirmed',
      items: [
        { name: 'بيتزا مارغريتا كبيرة', quantity: 1, price: 5500 },
        { name: 'بيتزا دجاج وسط', quantity: 1, price: 4500 },
        { name: 'كوكا كولا 1 لتر', quantity: 2, price: 1000 }
      ],
      total: 12000,
      date: '06 أبريل 2025 - 13:45',
      deliveryAddress: 'دمشق، المزة، شارع الفردوس، بناء رقم 12',
      deliveryTime: '14:30'
    },
    {
      id: 999,
      restaurantName: 'سوشي ماستر',
      restaurantImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      status: 'delivered',
      items: [
        { name: 'طبق سوشي متنوع', quantity: 1, price: 15000 },
        { name: 'سلطة يابانية', quantity: 1, price: 3500 }
      ],
      total: 18500,
      date: '05 أبريل 2025 - 20:15',
      deliveryAddress: 'دمشق، المزة، شارع الفردوس، بناء رقم 12'
    },
    {
      id: 998,
      restaurantName: 'مطعم الشام',
      restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      status: 'cancelled',
      items: [
        { name: 'كباب حلبي', quantity: 2, price: 4500 },
        { name: 'تبولة', quantity: 1, price: 2000 }
      ],
      total: 11000,
      date: '04 أبريل 2025 - 19:30',
      deliveryAddress: 'دمشق، المزة، شارع الفردوس، بناء رقم 12'
    }
  ];
  
  // تصفية الطلبات حسب التبويب النشط
  const currentOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing', 'on_the_way'].includes(order.status)
  );
  
  const pastOrders = orders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );
  
  const displayedOrders = activeTab === 'current' ? currentOrders : pastOrders;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">طلباتي</h1>
          <p className="mt-2 text-gray-600">تتبع وإدارة طلباتك الحالية والسابقة</p>
        </div>
        
        {/* تبويبات الطلبات */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 space-x-reverse">
              <button
                className={`${
                  activeTab === 'current'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                onClick={() => setActiveTab('current')}
              >
                الطلبات الحالية
                {currentOrders.length > 0 && (
                  <span className="mr-2 bg-primary-100 text-primary-600 py-0.5 px-2 rounded-full text-xs">
                    {currentOrders.length}
                  </span>
                )}
              </button>
              <button
                className={`${
                  activeTab === 'past'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                onClick={() => setActiveTab('past')}
              >
                الطلبات السابقة
              </button>
            </nav>
          </div>
        </div>
        
        {/* قائمة الطلبات */}
        {displayedOrders.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">لا توجد طلبات {activeTab === 'current' ? 'حالية' : 'سابقة'}</h3>
            <p className="mt-1 text-gray-500">
              {activeTab === 'current' 
                ? 'لم تقم بإجراء أي طلبات حالية. استكشف المطاعم وابدأ بالطلب!'
                : 'لم تقم بإجراء أي طلبات سابقة.'}
            </p>
            <div className="mt-6">
              <Link to="/restaurants" className="btn-primary">
                استكشف المطاعم
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
