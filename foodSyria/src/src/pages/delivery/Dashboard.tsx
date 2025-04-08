import React, { useState } from 'react';
import { motion } from 'framer-motion';

// مكونات مشتركة
const Sidebar: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'orders', label: 'الطلبات', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { id: 'map', label: 'الخريطة', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { id: 'profile', label: 'الملف الشخصي', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 bg-primary-600 text-white">
        <h2 className="text-xl font-bold">لوحة تحكم عامل التوصيل</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center p-3 rounded-md text-red-600 hover:bg-red-50 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};

// مكون لوحة التحكم
const DashboardTab: React.FC = () => {
  // بيانات وهمية للإحصائيات
  const stats = [
    { label: 'إجمالي التوصيلات', value: 87, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', color: 'bg-blue-500' },
    { label: 'التوصيلات اليوم', value: 5, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-yellow-500' },
    { label: 'الإيرادات (ل.س)', value: '42,500', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-500' },
    { label: 'التقييم', value: '4.9', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'bg-purple-500' }
  ];

  // بيانات وهمية للتوصيلات الأخيرة
  const recentDeliveries = [
    { id: 1001, restaurant: 'مطعم الشام', customer: 'محمد أحمد', address: 'دمشق، المزة، شارع الفردوس، بناء رقم 12', status: 'تم التسليم', time: 'منذ 2 ساعة', amount: 8800 },
    { id: 999, restaurant: 'سوشي ماستر', customer: 'عمر محمود', address: 'دمشق، المهاجرين، شارع نوري باشا، بناء رقم 23', status: 'في الطريق', time: 'منذ 30 دقيقة', amount: 18500 },
    { id: 997, restaurant: 'بيتزا هت', customer: 'سارة خالد', address: 'دمشق، أبو رمانة، شارع الجلاء، بناء رقم 8', status: 'تم التسليم', time: 'منذ 4 ساعات', amount: 12000 },
    { id: 995, restaurant: 'مطعم الشام', customer: 'ليلى سعيد', address: 'دمشق، المالكي، شارع عبد المنعم رياض، بناء رقم 15', status: 'تم التسليم', time: 'منذ 6 ساعات', amount: 5500 }
  ];

  // حالة التوفر
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">لوحة التحكم</h2>
      
      {/* حالة التوفر */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">حالة التوفر</h3>
            <p className="text-sm text-gray-600 mt-1">
              {isAvailable 
                ? 'أنت متاح حالياً لاستلام طلبات توصيل جديدة' 
                : 'أنت غير متاح حالياً لاستلام طلبات توصيل جديدة'}
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-sm font-medium text-gray-900">
              {isAvailable ? 'متاح' : 'غير متاح'}
            </span>
            <button
              type="button"
              className={`${
                isAvailable ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <span
                className={`${
                  isAvailable ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              >
                <span
                  className={`${
                    isAvailable ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
                  } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  aria-hidden="true"
                >
                  <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={`${
                    isAvailable ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
                  } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                  aria-hidden="true"
                >
                  <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-3 ml-4`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* التوصيلات الأخيرة */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">التوصيلات الأخيرة</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الطلب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المطعم
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العميل
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العنوان
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المبلغ
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوقت
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDeliveries.map((delivery) => (
                <tr key={delivery.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{delivery.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {delivery.restaurant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {delivery.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {delivery.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      delivery.status === 'تم التسليم' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {delivery.amount} ل.س
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {delivery.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* أداء التوصيل */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">أداء التوصيل</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">متوسط وقت التوصيل</span>
                <span className="text-sm font-medium text-gray-700">25 دقيقة</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">أسرع من 80% من عمال التوصيل</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">معدل رضا العملاء</span>
                <span className="text-sm font-medium text-gray-700">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">أعلى من 95% من عمال التوصيل</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">معدل قبول الطلبات</span>
                <span className="text-sm font-medium text-gray-700">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">أعلى من 85% من عمال التوصيل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// مكون الطلبات
const OrdersTab: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<string>('all');
  
  // بيانات وهمية للطلبات
  const orders = [
    { 
      id: 1001, 
      restaurant: { name: 'مطعم الشام', address: 'دمشق، شارع الثورة، بناء رقم 15', phone: '+963 11 1234567' }, 
      customer: { name: 'محمد أحمد', address: 'دمشق، المزة، شارع الفردوس، بناء رقم 12', phone: '+963 934 567890' }, 
      items: [{ name: 'شاورما دجاج', quantity: 2 }, { name: 'حمص', quantity: 1 }], 
      total: 8800, 
      status: 'pending', 
      time: '06 أبريل 2025 - 14:30' 
    },
    { 
      id: 999, 
      restaurant: { name: 'سوشي ماستر', address: 'دمشق، شارع بغداد، بناء رقم 7', phone: '+963 11 9876543' }, 
      customer: { name: 'عمر محمود', address: 'دمشق، المهاجرين، شارع نوري باشا، بناء رقم 23', phone: '+963 955 123456' }, 
      items: [{ name: 'طبق سوشي متنوع', quantity: 1 }, { name: 'سلطة يابانية', quantity: 1 }], 
      total: 18500, 
      status: 'on_the_way', 
      time: '06 أبريل 2025 - 12:15' 
    },
    { 
      id: 997, 
      restaurant: { name: 'بيتزا هت', address: 'دمشق، شارع الحمراء، بناء رقم 22', phone: '+963 11 5555555' }, 
      customer: { name: 'سارة خالد', address: 'دمشق، أبو رمانة، شارع الجلاء، بناء رقم 8', phone: '+963 966 789012' }, 
      items: [{ name: 'بيتزا مارغريتا كبيرة', quantity: 1 }, { name: 'كوكا كولا 1 لتر', quantity: 2 }], 
      total: 12000, 
      status: 'delivered', 
      time: '06 أبريل 2025 - 10:45' 
    },
    { 
      id: 995, 
      restaurant: { name: 'مطعم الشام', address: 'دمشق، شارع الثورة، بناء رقم 15', phone: '+963 11 1234567' }, 
      customer: { name: 'ليلى سعيد', address: 'دمشق، المالكي، شارع عبد المنعم رياض، بناء رقم 15', phone: '+963 944 345678' }, 
      items: [{ name: 'شيش طاووق', quantity: 1 }], 
      total: 5500, 
      status: 'delivered', 
      time: '06 أبريل 2025 - 09:30' 
    }
  ];
  
  // تصفية الطلبات حسب الحالة
  const filteredOrders = activeStatus === 'all'
    ? orders
    : orders.filter(order => order.status === activeStatus);
  
  // ترجمة حالة الطلب
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800' };
      case 'confirmed': return { label: 'تم التأكيد', color: 'bg-blue-100 text-blue-800' };
      case 'on_the_way': return { label: 'في الطريق', color: 'bg-purple-100 text-purple-800' };
      case 'delivered': return { label: 'تم التسليم', color: 'bg-green-100 text-green-800' };
      case 'cancelled': return { label: 'ملغي', color: 'bg-red-100 text-red-800' };
      default: return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">إدارة الطلبات</h2>
      
      {/* فلتر الحالة */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-4 space-x-reverse">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeStatus === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveStatus('all')}
          >
            الكل
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeStatus === 'pending'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveStatus('pending')}
          >
            قيد الانتظار
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeStatus === 'on_the_way'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveStatus('on_the_way')}
          >
            في الطريق
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeStatus === 'delivered'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveStatus('delivered')}
          >
            تم التسليم
          </button>
        </div>
      </div>
      
      {/* قائمة الطلبات */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">طلب #{order.id}</h3>
                <p className="text-sm text-gray-600">{order.time}</p>
              </div>
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color}`}>
                {getStatusLabel(order.status).label}
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">معلومات المطعم</h4>
                  <p className="text-sm text-gray-600">{order.restaurant.name}</p>
                  <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                  <p className="text-sm text-gray-600">{order.restaurant.phone}</p>
                  <button className="mt-2 bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1 rounded-full text-sm font-medium">
                    اتصال بالمطعم
                  </button>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">معلومات العميل</h4>
                  <p className="text-sm text-gray-600">{order.customer.name}</p>
                  <p className="text-sm text-gray-600">{order.customer.address}</p>
                  <p className="text-sm text-gray-600">{order.customer.phone}</p>
                  <button className="mt-2 bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1 rounded-full text-sm font-medium">
                    اتصال بالعميل
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-2">تفاصيل الطلب</h4>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                  <span className="font-bold">المجموع:</span>
                  <span className="font-bold">{order.total} ل.س</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-4 space-x-reverse">
                {order.status === 'pending' && (
                  <>
                    <button className="btn-outline text-red-600 border-red-600 hover:bg-red-50">
                      رفض الطلب
                    </button>
                    <button className="btn-primary">
                      قبول الطلب
                    </button>
                  </>
                )}
                
                {order.status === 'on_the_way' && (
                  <>
                    <button className="btn-outline">
                      مشاكل في التوصيل
                    </button>
                    <button className="btn-primary">
                      تم التسليم
                    </button>
                  </>
                )}
                
                {order.status === 'delivered' && (
                  <button className="btn-primary">
                    عرض التفاصيل
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900">لا توجد طلبات {activeStatus !== 'all' ? getStatusLabel(activeStatus).label : ''}</h3>
            <p className="mt-1 text-gray-500">
              {activeStatus === 'pending' 
                ? 'لا توجد طلبات قيد الانتظار حالياً. تحقق لاحقاً!'
                : activeStatus === 'on_the_way'
                ? 'لا توجد طلبات في الطريق حالياً.'
                : activeStatus === 'delivered'
                ? 'لم تقم بتوصيل أي طلبات بعد.'
                : 'لا توجد طلبات متاحة حالياً.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// صفحة لوحة تحكم عامل التوصيل
const DeliveryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // عرض المحتوى حسب التبويب النشط
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'orders':
        return <OrdersTab />;
      case 'map':
        return <div>محتوى الخريطة</div>;
      case 'profile':
        return <div>محتوى الملف الشخصي</div>;
      default:
        return <DashboardTab />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
