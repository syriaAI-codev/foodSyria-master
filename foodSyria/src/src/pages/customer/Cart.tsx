import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

// مكون سلة التسوق
const Cart: React.FC = () => {
  const { 
    items, 
    restaurantName, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    getTotal 
  } = useCart();
  
  // حالة عرض تأكيد الحذف
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  
  // التنقل إلى صفحة إتمام الطلب
  const handleCheckout = () => {
    if (items.length === 0) return;
    window.location.href = '/checkout';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">سلة التسوق</span>
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
          <h1 className="text-3xl font-bold text-gray-900">سلة التسوق</h1>
          {restaurantName && (
            <p className="mt-2 text-gray-600">
              عناصر من مطعم <span className="font-medium">{restaurantName}</span>
            </p>
          )}
        </div>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">سلة التسوق فارغة</h3>
            <p className="text-gray-500 mb-4">لم تقم بإضافة أي عناصر إلى سلة التسوق بعد</p>
            <a href="/restaurants" className="btn-primary">
              تصفح المطاعم
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">العناصر ({items.length})</h2>
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    إفراغ السلة
                  </button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 flex items-center"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-primary-600 font-bold">{item.price} ل.س</p>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
                
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full"
                  disabled={items.length === 0}
                >
                  متابعة إتمام الطلب
                </button>
                
                <div className="mt-4 text-center">
                  <a href="/restaurants" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                    العودة إلى التسوق
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* نافذة تأكيد إفراغ السلة */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">إفراغ سلة التسوق</h2>
            <p className="text-gray-600 mb-6">
              هل أنت متأكد من رغبتك في إفراغ سلة التسوق؟ سيتم حذف جميع العناصر.
            </p>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setShowClearConfirm(false);
                }}
                className="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500"
              >
                إفراغ السلة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
