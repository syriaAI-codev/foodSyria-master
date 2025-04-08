import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDeliveryTracking } from '../../contexts/DeliveryTrackingContext';
import GeolocationComponent from '../../components/maps/GeolocationComponent';
import DeliveryTrackingMap from '../../components/maps/DeliveryTrackingMap';

// صفحة لوحة تحكم السائق
const DeliveryDashboard: React.FC = () => {
  // استخدام سياق تتبع التوصيل
  const {
    driverData,
    isDriverAvailable,
    toggleDriverAvailability,
    updateDriverLocation,
    acceptOrder,
    updateOrderStatus,
    completeDelivery,
    loading,
    error
  } = useDeliveryTracking();
  
  // مفتاح Google Maps API
  const googleMapsApiKey = 'AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8';
  
  // حالة الطلبات المتاحة
  const [availableOrders, setAvailableOrders] = useState<Array<{
    id: number;
    restaurant: {
      id: number;
      name: string;
      address: string;
      location: { lat: number; lng: number };
    };
    customer: {
      name: string;
      address: string;
      location: { lat: number; lng: number };
    };
    items: Array<{
      name: string;
      quantity: number;
    }>;
    total: number;
    createdAt: string;
    distance: number;
    estimatedTime: number;
  }>>([
    {
      id: 1001,
      restaurant: {
        id: 1,
        name: 'مطعم الشام',
        address: 'دمشق، شارع الثورة، بناء رقم 15',
        location: { lat: 33.5138, lng: 36.2765 }
      },
      customer: {
        name: 'محمد أحمد',
        address: 'دمشق، شارع الحمراء، بناء رقم 7، طابق 3',
        location: { lat: 33.5224, lng: 36.2922 }
      },
      items: [
        { name: 'حمص', quantity: 1 },
        { name: 'كباب حلبي', quantity: 2 },
        { name: 'عصير ليمون', quantity: 2 }
      ],
      total: 29500,
      createdAt: '2025-04-06T14:30:00',
      distance: 2.5,
      estimatedTime: 15
    },
    {
      id: 1002,
      restaurant: {
        id: 2,
        name: 'مطعم دمشق',
        address: 'دمشق، شارع بغداد، بناء رقم 23',
        location: { lat: 33.5180, lng: 36.2840 }
      },
      customer: {
        name: 'أحمد محمود',
        address: 'دمشق، شارع الميدان، بناء رقم 12، طابق 1',
        location: { lat: 33.5100, lng: 36.2950 }
      },
      items: [
        { name: 'متبل', quantity: 1 },
        { name: 'شيش طاووق', quantity: 1 }
      ],
      total: 12500,
      createdAt: '2025-04-06T14:45:00',
      distance: 3.2,
      estimatedTime: 20
    }
  ]);
  
  // حالة الطلب الحالي
  const [currentOrder, setCurrentOrder] = useState<{
    id: number;
    status: 'accepted' | 'picked_up' | 'delivered';
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
      name: string;
      quantity: number;
    }>;
    total: number;
    createdAt: string;
  } | null>(null);
  
  // حالة عرض تفاصيل الطلب
  const [showOrderDetails, setShowOrderDetails] = useState<number | null>(null);
  
  // تحديث موقع السائق عند تغيير الموقع
  const handleLocationUpdate = (position: { lat: number; lng: number }) => {
    updateDriverLocation(position.lat, position.lng);
  };
  
  // قبول طلب
  const handleAcceptOrder = async (orderId: number) => {
    await acceptOrder(orderId);
    
    // في التطبيق الحقيقي، سيتم استرجاع بيانات الطلب من قاعدة البيانات
    // هنا نستخدم الطلب من القائمة المتاحة
    const order = availableOrders.find(o => o.id === orderId);
    if (order) {
      setCurrentOrder({
        id: order.id,
        status: 'accepted',
        restaurant: {
          ...order.restaurant,
          phone: '+963 11 1234567'
        },
        customer: {
          ...order.customer,
          phone: '+963 955 123456'
        },
        items: order.items,
        total: order.total,
        createdAt: order.createdAt
      });
      
      // إزالة الطلب من القائمة المتاحة
      setAvailableOrders(availableOrders.filter(o => o.id !== orderId));
    }
  };
  
  // تحديث حالة الطلب الحالي
  const handleUpdateOrderStatus = async (status: 'picked_up' | 'delivered') => {
    if (!currentOrder) return;
    
    if (status === 'picked_up') {
      await updateOrderStatus(currentOrder.id, 'on_the_way');
      setCurrentOrder({
        ...currentOrder,
        status: 'picked_up'
      });
    } else if (status === 'delivered') {
      await completeDelivery(currentOrder.id);
      setCurrentOrder({
        ...currentOrder,
        status: 'delivered'
      });
      
      // بعد فترة قصيرة، إزالة الطلب الحالي
      setTimeout(() => {
        setCurrentOrder(null);
      }, 5000);
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">لوحة تحكم السائق</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="relative inline-block">
              <button
                onClick={toggleDriverAvailability}
                disabled={loading || !!currentOrder}
                className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDriverAvailable
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500'
                    : 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'
                } ${(loading || !!currentOrder) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'جاري التحديث...' : isDriverAvailable ? 'متاح للتوصيل' : 'غير متاح'}
              </button>
              {currentOrder && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-600 rounded-full"></span>
              )}
            </div>
            <a href="/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {driverData && (
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">مرحباً، {driverData.name}</h1>
            <p className="mt-2 text-gray-600">
              {isDriverAvailable
                ? 'أنت متاح حالياً لاستلام طلبات جديدة'
                : 'أنت غير متاح حالياً لاستلام طلبات جديدة'}
            </p>
          </div>
        )}
        
        {/* مكون تحديد الموقع */}
        <div className="mb-6">
          <GeolocationComponent
            apiKey={googleMapsApiKey}
            onLocationUpdate={handleLocationUpdate}
          />
        </div>
        
        {/* الطلب الحالي */}
        {currentOrder && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
          >
            <div className="p-4 bg-primary-50 border-b border-primary-100">
              <h2 className="text-lg font-medium text-primary-900">الطلب الحالي</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">رقم الطلب: <span className="font-medium">#{currentOrder.id}</span></p>
                    <p className="text-sm text-gray-600">تاريخ الطلب: {formatDateTime(currentOrder.createdAt)}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      currentOrder.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                      currentOrder.status === 'picked_up' ? 'bg-primary-100 text-primary-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {currentOrder.status === 'accepted' ? 'تم القبول' :
                       currentOrder.status === 'picked_up' ? 'تم الاستلام' :
                       'تم التوصيل'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">معلومات المطعم</h3>
                    <p className="text-gray-900 font-medium">{currentOrder.restaurant.name}</p>
                    <p className="text-gray-600 text-sm mb-2">{currentOrder.restaurant.address}</p>
                    <a
                      href={`tel:${currentOrder.restaurant.phone}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {currentOrder.restaurant.phone}
                    </a>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-gray-900 mb-2">معلومات العميل</h3>
                    <p className="text-gray-900 font-medium">{currentOrder.customer.name}</p>
                    <p className="text-gray-600 text-sm mb-2">{currentOrder.customer.address}</p>
                    <a
                      href={`tel:${currentOrder.customer.phone}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {currentOrder.customer.phone}
                    </a>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-2">عناصر الطلب</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {currentOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <span className="text-gray-900">{item.name}</span>
                            <span className="text-gray-600 mr-2">x{item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between font-bold">
                        <span>الإجمالي:</span>
                        <span>{currentOrder.total} ل.س</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-64 rounded-lg overflow-hidden mb-6">
                  <DeliveryTrackingMap
                    apiKey={googleMapsApiKey}
                    restaurantLocation={currentOrder.restaurant.location}
                    customerLocation={currentOrder.customer.location}
                    driverLocation={driverData?.current_location || null}
                    showDriver={true}
                  />
                </div>
                
                <div className="flex justify-end">
                  {currentOrder.status === 'accepted' && (
                    <button
                      onClick={() => handleUpdateOrderStatus('picked_up')}
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'جاري التحديث...' : 'تأكيد استلام الطلب من المطعم'}
                    </button>
                  )}
                  
                  {currentOrder.status === 'picked_up' && (
                    <button
                      onClick={() => handleUpdateOrderStatus('delivered')}
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'جاري التحديث...' : 'تأكيد توصيل الطلب للعميل'}
                    </button>
                  )}
                  
                  {currentOrder.status === 'delivered' && (
                    <div className="text-green-600 font-medium">
                      تم توصيل الطلب بنجاح!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* الطلبات المتاحة */}
        {isDriverAvailable && !currentOrder && availableOrders.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">الطلبات المتاحة ({availableOrders.length})</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {availableOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{order.restaurant.name}</h3>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(order.createdAt)} • {order.distance} كم • {order.estimatedTime} دقيقة
                      </p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{order.total} ل.س</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {order.items.length} عناصر: {order.items.map(item => `${item.name} (${item.quantity})`).join('، ')}
                  </p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setShowOrderDetails(showOrderDetails === order.id ? null : order.id)}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      {showOrderDetails === order.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                    </button>
                    
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="btn-primary-sm"
                      disabled={loading}
                    >
                      {loading ? 'جاري التحديث...' : 'قبول الطلب'}
                    </button>
                  </div>
                  
                  {showOrderDetails === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">عنوان المطعم</h4>
                          <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">عنوان العميل</h4>
                          <p className="text-sm text-gray-600">{order.customer.address}</p>
                        </div>
                      </div>
                      
                      <div className="h-48 rounded-lg overflow-hidden">
                        <DeliveryTrackingMap
                          apiKey={googleMapsApiKey}
                          restaurantLocation={order.restaurant.location}
                          customerLocation={order.customer.location}
                          driverLocation={driverData?.current_location || null}
                          showDriver={true}
                        />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* رسالة عندما لا تكون هناك طلبات متاحة */}
        {isDriverAvailable && !currentOrder && availableOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات متاحة حالياً</h3>
            <p className="text-gray-500 mb-4">سيتم إشعارك عند توفر طلبات جديدة</p>
          </div>
        )}
        
        {/* رسالة عندما يكون السائق غير متاح */}
        {!isDriverAvailable && !currentOrder && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">أنت غير متاح حالياً</h3>
            <p className="text-gray-500 mb-4">قم بتغيير حالتك إلى "متاح للتوصيل" لاستلام طلبات جديدة</p>
            <button
              onClick={toggleDriverAvailability}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'جاري التحديث...' : 'تغيير الحالة إلى متاح'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeliveryDashboard;
