import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import DeliveryTrackingMap from '../../components/maps/DeliveryTrackingMap';

// صفحة تتبع الطلب
const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // مفتاح Google Maps API
  const googleMapsApiKey = 'AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8';
  
  // حالة الطلب
  const [order, setOrder] = useState<{
    id: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'on_the_way' | 'delivered' | 'cancelled';
    restaurant: {
      id: number;
      name: string;
      address: string;
      location: { lat: number; lng: number };
      phone: string;
    };
    customer: {
      name: string;
      address: string;
      location: { lat: number; lng: number };
      phone: string;
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
    estimatedDeliveryTime: string;
    deliveryDriver?: {
      id: number;
      name: string;
      phone: string;
      location?: { lat: number; lng: number };
    };
  }>({
    id: parseInt(id || '1001'),
    status: 'on_the_way',
    restaurant: {
      id: 1,
      name: 'مطعم الشام',
      address: 'دمشق، شارع الثورة، بناء رقم 15',
      location: { lat: 33.5138, lng: 36.2765 },
      phone: '+963 11 1234567'
    },
    customer: {
      name: 'محمد أحمد',
      address: 'دمشق، شارع الحمراء، بناء رقم 7، طابق 3',
      location: { lat: 33.5224, lng: 36.2922 },
      phone: '+963 955 123456'
    },
    items: [
      { id: 101, name: 'حمص', price: 2500, quantity: 1 },
      { id: 201, name: 'كباب حلبي', price: 12000, quantity: 2 },
      { id: 301, name: 'عصير ليمون', price: 1500, quantity: 2 }
    ],
    total: 29500,
    deliveryFee: 2000,
    createdAt: '2025-04-06T14:30:00',
    estimatedDeliveryTime: '2025-04-06T15:15:00',
    deliveryDriver: {
      id: 1,
      name: 'رامي علي',
      phone: '+963 955 111222',
      location: { lat: 33.5180, lng: 36.2840 }
    }
  });
  
  // محاكاة تحديث موقع السائق
  useEffect(() => {
    if (order.status === 'on_the_way' && order.deliveryDriver && order.deliveryDriver.location) {
      const interval = setInterval(() => {
        // تحريك السائق نحو العميل
        if (order.deliveryDriver && order.deliveryDriver.location) {
          const driverLoc = order.deliveryDriver.location;
          const customerLoc = order.customer.location;
          
          // حساب الاتجاه نحو العميل
          const latDiff = customerLoc.lat - driverLoc.lat;
          const lngDiff = customerLoc.lng - driverLoc.lng;
          
          // تحريك السائق بنسبة صغيرة من المسافة المتبقية
          const newLat = driverLoc.lat + latDiff * 0.05;
          const newLng = driverLoc.lng + lngDiff * 0.05;
          
          // تحديث موقع السائق
          setOrder(prevOrder => ({
            ...prevOrder,
            deliveryDriver: {
              ...prevOrder.deliveryDriver!,
              location: { lat: newLat, lng: newLng }
            }
          }));
          
          // التحقق مما إذا وصل السائق إلى العميل
          const distance = Math.sqrt(
            Math.pow(newLat - customerLoc.lat, 2) + 
            Math.pow(newLng - customerLoc.lng, 2)
          );
          
          if (distance < 0.0005) {
            clearInterval(interval);
            setOrder(prevOrder => ({
              ...prevOrder,
              status: 'delivered'
            }));
          }
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [order.status, order.deliveryDriver]);
  
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
  
  // حساب الوقت المتبقي للتوصيل
  const getRemainingTime = () => {
    const now = new Date();
    const estimatedTime = new Date(order.estimatedDeliveryTime);
    
    if (now > estimatedTime) {
      return 'جاري التوصيل...';
    }
    
    const diffMs = estimatedTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    return `${diffMins} دقيقة`;
  };
  
  // الحصول على نسبة تقدم الطلب
  const getOrderProgress = () => {
    const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'on_the_way', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    
    if (currentIndex === -1 || order.status === 'cancelled') {
      return 0;
    }
    
    return (currentIndex / (statusOrder.length - 1)) * 100;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">تتبع الطلب</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/orders" className="text-gray-600 hover:text-primary-600">طلباتي</a>
            <a href="/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">تتبع الطلب #{order.id}</h1>
          <p className="mt-2 text-gray-600">
            طلب من <span className="font-medium">{order.restaurant.name}</span> - {formatDateTime(order.createdAt)}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">حالة الطلب</h2>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(order.status).color}`}>
                  {getStatusLabel(order.status).label}
                </span>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-600 bg-primary-200">
                          تقدم الطلب
                        </span>
                      </div>
                      {order.status !== 'cancelled' && order.status !== 'delivered' && (
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-primary-600">
                            الوقت المتبقي: {getRemainingTime()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                      <div
                        style={{ width: `${getOrderProgress()}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status !== 'pending' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-xs mt-1 text-center">استلام الطلب</div>
                    </div>
                    <div className="flex-1 mx-2 h-1 mt-4 bg-gray-200">
                      <div className={`h-full ${order.status !== 'pending' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['confirmed', 'preparing', 'ready', 'on_the_way', 'delivered'].includes(order.status) ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-xs mt-1 text-center">تأكيد الطلب</div>
                    </div>
                    <div className="flex-1 mx-2 h-1 mt-4 bg-gray-200">
                      <div className={`h-full ${['preparing', 'ready', 'on_the_way', 'delivered'].includes(order.status) ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['preparing', 'ready', 'on_the_way', 'delivered'].includes(order.status) ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-xs mt-1 text-center">تحضير الطلب</div>
                    </div>
                    <div className="flex-1 mx-2 h-1 mt-4 bg-gray-200">
                      <div className={`h-full ${['ready', 'on_the_way', 'delivered'].includes(order.status) ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${['on_the_way', 'delivered'].includes(order.status) ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                        </svg>
                      </div>
                      <div className="text-xs mt-1 text-center">في الطريق</div>
                    </div>
                    <div className="flex-1 mx-2 h-1 mt-4 bg-gray-200">
                      <div className={`h-full ${order.status === 'delivered' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'delivered' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </div>
                      <div className="text-xs mt-1 text-center">تم التوصيل</div>
                    </div>
                  </div>
                </div>
                
                {order.status === 'on_the_way' && order.deliveryDriver && (
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
                
                <div className="h-64 rounded-lg overflow-hidden">
                  <DeliveryTrackingMap
                    apiKey={googleMapsApiKey}
                    restaurantLocation={order.restaurant.location}
                    customerLocation={order.customer.location}
                    driverLocation={order.deliveryDriver?.location}
                    showDriver={order.status === 'on_the_way'}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">تفاصيل الطلب</h2>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">المطعم</h3>
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{order.restaurant.name}</p>
                    <p className="text-gray-600 text-sm">{order.restaurant.address}</p>
                  </div>
                  <a
                    href={`tel:${order.restaurant.phone}`}
                    className="bg-primary-50 text-primary-600 hover:bg-primary-100 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    اتصال
                  </a>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">عنوان التوصيل</h3>
                <p className="text-gray-900">{order.customer.name}</p>
                <p className="text-gray-600 text-sm">{order.customer.address}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">العناصر ({order.items.length})</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 mr-1">x{item.quantity}</span>
                      </div>
                      <span>{item.price * item.quantity} ل.س</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
