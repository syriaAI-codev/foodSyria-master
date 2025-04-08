import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import LocationPicker from '../../components/maps/LocationPicker';

// صفحة إتمام الطلب
const Checkout: React.FC = () => {
  const { 
    items, 
    restaurantName, 
    clearCart, 
    getTotal 
  } = useCart();
  
  // مفتاح Google Maps API
  const googleMapsApiKey = 'AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8';
  
  // حالة معلومات التوصيل
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    address: '',
    location: { lat: 33.5138, lng: 36.2765 },
    notes: '',
    paymentMethod: 'cash'
  });
  
  // حالة الخطوة الحالية
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // حالة تقديم الطلب
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  
  // التحقق من صحة النموذج
  const isFormValid = () => {
    return (
      deliveryInfo.name.trim() !== '' &&
      deliveryInfo.phone.trim() !== '' &&
      deliveryInfo.address.trim() !== ''
    );
  };
  
  // معالج تحديث موقع التوصيل
  const handleLocationUpdate = (location: { lat: number; lng: number; address: string }) => {
    setDeliveryInfo({
      ...deliveryInfo,
      location: { lat: location.lat, lng: location.lng },
      address: location.address
    });
  };
  
  // معالج تقديم الطلب
  const handleSubmitOrder = () => {
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    // محاكاة طلب API
    setTimeout(() => {
      // إنشاء معرف طلب عشوائي
      const newOrderId = Math.floor(10000 + Math.random() * 90000);
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };
  
  // إذا كانت السلة فارغة، إعادة التوجيه إلى صفحة السلة
  if (items.length === 0 && !orderComplete) {
    if (typeof window !== 'undefined') {
      window.location.href = '/cart';
    }
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">إتمام الطلب</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/cart" className="text-gray-600 hover:text-primary-600">سلة التسوق</a>
            <a href="/orders" className="text-gray-600 hover:text-primary-600">طلباتي</a>
            <a href="/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orderComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم تقديم طلبك بنجاح!</h2>
            <p className="text-gray-600 mb-6">
              رقم الطلب: <span className="font-bold">#{orderId}</span>
            </p>
            <p className="text-gray-600 mb-6">
              يمكنك متابعة حالة طلبك من صفحة "طلباتي". سنرسل لك إشعارًا عندما يتم تأكيد طلبك.
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <a href="/orders" className="btn-primary">
                متابعة طلبي
              </a>
              <a href="/restaurants" className="btn-outline">
                العودة إلى التسوق
              </a>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">إتمام الطلب</h1>
              {restaurantName && (
                <p className="mt-2 text-gray-600">
                  طلب من مطعم <span className="font-medium">{restaurantName}</span>
                </p>
              )}
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'} ml-2`}>
                  1
                </div>
                <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-primary-600' : 'bg-gray-200'} ml-2`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
              </div>
              <div className="flex mt-2">
                <div className="w-8 ml-2 text-center">
                  <span className={`text-xs ${currentStep >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>التوصيل</span>
                </div>
                <div className="w-16 ml-2"></div>
                <div className="w-8 text-center">
                  <span className={`text-xs ${currentStep >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>المراجعة</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h2 className="text-lg font-medium text-gray-900">معلومات التوصيل</h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            الاسم الكامل <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={deliveryInfo.name}
                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="أدخل اسمك الكامل"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهاتف <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={deliveryInfo.phone}
                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="مثال: +963 955 123456"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          عنوان التوصيل <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="address"
                          value={deliveryInfo.address}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 mb-2"
                          placeholder="أدخل عنوان التوصيل بالتفصيل"
                          required
                        />
                        
                        <div className="h-64 rounded-lg overflow-hidden">
                          <LocationPicker
                            apiKey={googleMapsApiKey}
                            initialLocation={{
                              lat: deliveryInfo.location.lat,
                              lng: deliveryInfo.location.lng,
                              address: deliveryInfo.address
                            }}
                            onLocationSelect={handleLocationUpdate}
                          />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          يرجى تحديد موقعك على الخريطة بدقة لضمان وصول الطلب بسرعة
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          ملاحظات إضافية
                        </label>
                        <textarea
                          id="notes"
                          value={deliveryInfo.notes}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                          rows={3}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          placeholder="أي تعليمات خاصة للتوصيل أو المطعم"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          طريقة الدفع
                        </label>
                        <div className="mt-1 space-y-2">
                          <div className="flex items-center">
                            <input
                              id="cash"
                              name="paymentMethod"
                              type="radio"
                              checked={deliveryInfo.paymentMethod === 'cash'}
                              onChange={() => setDeliveryInfo({ ...deliveryInfo, paymentMethod: 'cash' })}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 ml-2"
                            />
                            <label htmlFor="cash" className="text-sm text-gray-700">
                              الدفع عند الاستلام
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="btn-primary w-full"
                          disabled={!isFormValid()}
                        >
                          متابعة
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h2 className="text-lg font-medium text-gray-900">مراجعة الطلب</h2>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-900 mb-2">معلومات التوصيل</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">الاسم:</p>
                              <p className="font-medium">{deliveryInfo.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">رقم الهاتف:</p>
                              <p className="font-medium">{deliveryInfo.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-600">العنوان:</p>
                              <p className="font-medium">{deliveryInfo.address}</p>
                            </div>
                            {deliveryInfo.notes && (
                              <div className="md:col-span-2">
                                <p className="text-sm text-gray-600">ملاحظات:</p>
                                <p className="font-medium">{deliveryInfo.notes}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-gray-600">طريقة الدفع:</p>
                              <p className="font-medium">
                                {deliveryInfo.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : ''}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-900 mb-2">عناصر الطلب</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="divide-y divide-gray-200">
                            {items.map((item) => (
                              <div key={item.id} className="py-3 flex justify-between">
                                <div>
                                  <span className="text-gray-900">{item.name}</span>
                                  <span className="text-gray-600 mr-2">x{item.quantity}</span>
                                </div>
                                <span className="text-gray-900">{item.price * item.quantity} ل.س</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="btn-outline"
                        >
                          العودة
                        </button>
                        <button
                          onClick={handleSubmitOrder}
                          className="btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'جاري تقديم الطلب...' : 'تأكيد الطلب'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">ملخص الطلب</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="text-gray-900">{getTotal()} ل.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رسوم التوصيل:</span>
                      <span className="text-gray-900">2000 ل.س</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                      <span>الإجمالي:</span>
                      <span>{getTotal() + 2000} ل.س</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">العناصر ({items.length})</h3>
                    <div className="max-h-60 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between py-2 text-sm">
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <span className="text-gray-600 mr-1">x{item.quantity}</span>
                          </div>
                          <span>{item.price * item.quantity} ل.س</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Checkout;
