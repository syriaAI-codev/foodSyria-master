import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// صفحة إعدادات النظام للمدير
const AdminSettings: React.FC = () => {
  // حالة الإعدادات العامة
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'فود سوريا',
    siteDescription: 'منصة توصيل الطعام الأولى في سوريا',
    contactEmail: 'support@foodsyria.com',
    contactPhone: '+963 11 1234567',
    defaultCurrency: 'SYP',
    defaultLanguage: 'ar',
    maintenanceMode: false
  });
  
  // حالة إعدادات التوصيل
  const [deliverySettings, setDeliverySettings] = useState({
    baseDeliveryFee: 5000,
    minOrderAmount: 15000,
    maxDeliveryDistance: 10,
    estimatedDeliveryTime: 45,
    autoAssignDrivers: true
  });
  
  // حالة إعدادات الإشعارات
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminOrderNotifications: true,
    restaurantOrderNotifications: true,
    driverAssignmentNotifications: true,
    customerOrderStatusNotifications: true
  });
  
  // حالة إعدادات التطبيق
  const [appSettings, setAppSettings] = useState({
    allowGuestCheckout: false,
    requirePhoneVerification: true,
    showRestaurantRatings: true,
    enableReviews: true,
    enablePromoCode: true,
    maxItemsPerOrder: 50
  });
  
  // حالة التحميل
  const [isLoading, setIsLoading] = useState(false);
  // حالة النجاح
  const [saveSuccess, setSaveSuccess] = useState(false);
  // حالة الخطأ
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // حفظ الإعدادات
  const saveSettings = (settingsType: 'general' | 'delivery' | 'notification' | 'app') => {
    // في التطبيق الحقيقي، سيتم حفظ الإعدادات في قاعدة البيانات
    // هنا نقوم بمحاكاة عملية الحفظ
    setIsLoading(true);
    setSaveSuccess(false);
    setSaveError(null);
    
    setTimeout(() => {
      setIsLoading(false);
      setSaveSuccess(true);
      
      // إخفاء رسالة النجاح بعد 3 ثوانٍ
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  // تنسيق المبلغ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SY', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">لوحة تحكم المدير - الإعدادات</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/admin/dashboard" className="text-gray-600 hover:text-primary-600">لوحة التحكم</a>
            <a href="/admin/tracking" className="text-gray-600 hover:text-primary-600">تتبع الطلبات</a>
            <a href="/admin/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/admin/users" className="text-gray-600 hover:text-primary-600">المستخدمين</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">إعدادات النظام</h1>
          <p className="mt-2 text-gray-600">تخصيص إعدادات النظام وضبط سلوك التطبيق</p>
        </div>
        
        {/* رسائل النجاح والخطأ */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md"
          >
            تم حفظ الإعدادات بنجاح!
          </motion.div>
        )}
        
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md"
          >
            حدث خطأ أثناء حفظ الإعدادات: {saveError}
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* الإعدادات العامة */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">الإعدادات العامة</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">اسم الموقع</label>
                <input
                  type="text"
                  id="siteName"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">وصف الموقع</label>
                <textarea
                  id="siteDescription"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني للتواصل</label>
                  <input
                    type="email"
                    id="contactEmail"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف للتواصل</label>
                  <input
                    type="text"
                    id="contactPhone"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={generalSettings.contactPhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="defaultCurrency" className="block text-sm font-medium text-gray-700 mb-1">العملة الافتراضية</label>
                  <select
                    id="defaultCurrency"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={generalSettings.defaultCurrency}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, defaultCurrency: e.target.value })}
                  >
                    <option value="SYP">ليرة سورية (SYP)</option>
                    <option value="USD">دولار أمريكي (USD)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 mb-1">اللغة الافتراضية</label>
                  <select
                    id="defaultLanguage"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={generalSettings.defaultLanguage}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, defaultLanguage: e.target.value })}
                  >
                    <option value="ar">العربية</option>
                    <option value="en">الإنجليزية</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={generalSettings.maintenanceMode}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMode: e.target.checked })}
                />
                <label htmlFor="maintenanceMode" className="mr-2 block text-sm text-gray-900">
                  تفعيل وضع الصيانة
                </label>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => saveSettings('general')}
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'جاري الحفظ...' : 'حفظ الإعدادات العامة'}
                </button>
              </div>
            </div>
          </div>
          
          {/* إعدادات التوصيل */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">إعدادات التوصيل</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="baseDeliveryFee" className="block text-sm font-medium text-gray-700 mb-1">رسوم التوصيل الأساسية (ل.س)</label>
                <input
                  type="number"
                  id="baseDeliveryFee"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={deliverySettings.baseDeliveryFee}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, baseDeliveryFee: parseInt(e.target.value) })}
                />
                <p className="mt-1 text-xs text-gray-500">القيمة الحالية: {formatCurrency(deliverySettings.baseDeliveryFee)} ل.س</p>
              </div>
              
              <div>
                <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700 mb-1">الحد الأدنى للطلب (ل.س)</label>
                <input
                  type="number"
                  id="minOrderAmount"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={deliverySettings.minOrderAmount}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, minOrderAmount: parseInt(e.target.value) })}
                />
                <p className="mt-1 text-xs text-gray-500">القيمة الحالية: {formatCurrency(deliverySettings.minOrderAmount)} ل.س</p>
              </div>
              
              <div>
                <label htmlFor="maxDeliveryDistance" className="block text-sm font-medium text-gray-700 mb-1">أقصى مسافة للتوصيل (كم)</label>
                <input
                  type="number"
                  id="maxDeliveryDistance"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={deliverySettings.maxDeliveryDistance}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, maxDeliveryDistance: parseInt(e.target.value) })}
                />
              </div>
              
              <div>
                <label htmlFor="estimatedDeliveryTime" className="block text-sm font-medium text-gray-700 mb-1">وقت التوصيل التقديري (دقيقة)</label>
                <input
                  type="number"
                  id="estimatedDeliveryTime"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={deliverySettings.estimatedDeliveryTime}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, estimatedDeliveryTime: parseInt(e.target.value) })}
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoAssignDrivers"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={deliverySettings.autoAssignDrivers}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, autoAssignDrivers: e.target.checked })}
                />
                <label htmlFor="autoAssignDrivers" className="mr-2 block text-sm text-gray-900">
                  تعيين السائقين تلقائيًا للطلبات
                </label>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => saveSettings('delivery')}
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'جاري الحفظ...' : 'حفظ إعدادات التوصيل'}
                </button>
              </div>
            </div>
          </div>
          
          {/* إعدادات الإشعارات */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">إعدادات الإشعارات</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                />
                <label htmlFor="emailNotifications" className="mr-2 block text-sm text-gray-900">
                  تفعيل إشعارات البريد الإلكتروني
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                />
                <label htmlFor="smsNotifications" className="mr-2 block text-sm text-gray-900">
                  تفعيل إشعارات الرسائل النصية
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                />
                <label htmlFor="pushNotifications" className="mr-2 block text-sm text-gray-900">
                  تفعيل الإشعارات الفورية
                </label>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">أنواع الإشعارات</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="adminOrderNotifications"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={notificationSettings.adminOrderNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, adminOrderNotifications: e.target.checked })}
                    />
                    <label htmlFor="adminOrderNotifications" className="mr-2 block text-sm text-gray-900">
                      إشعارات الطلبات للمدير
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="restaurantOrderNotifications"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={notificationSettings.restaurantOrderNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, restaurantOrderNotifications: e.target.checked })}
                    />
                    <label htmlFor="restaurantOrderNotifications" className="mr-2 block text-sm text-gray-900">
                      إشعارات الطلبات للمطاعم
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="driverAssignmentNotifications"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={notificationSettings.driverAssignmentNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, driverAssignmentNotifications: e.target.checked })}
                    />
                    <label htmlFor="driverAssignmentNotifications" className="mr-2 block text-sm text-gray-900">
                      إشعارات تعيين السائقين
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="customerOrderStatusNotifications"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={notificationSettings.customerOrderStatusNotifications}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, customerOrderStatusNotifications: e.target.checked })}
                    />
                    <label htmlFor="customerOrderStatusNotifications" className="mr-2 block text-sm text-gray-900">
                      إشعارات حالة الطلب للعملاء
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => saveSettings('notification')}
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'جاري الحفظ...' : 'حفظ إعدادات الإشعارات'}
                </button>
              </div>
            </div>
          </div>
          
          {/* إعدادات التطبيق */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">إعدادات التطبيق</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowGuestCheckout"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={appSettings.allowGuestCheckout}
                  onChange={(e) => setAppSettings({ ...appSettings, allowGuestCheckout: e.target.checked })}
                />
                <label htmlFor="allowGuestCheckout" className="mr-2 block text-sm text-gray-900">
                  السماح بإتمام الطلب للزوار
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requirePhoneVerification"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={appSettings.requirePhoneVerification}
                  onChange={(e) => setAppSettings({ ...appSettings, requirePhoneVerification: e.target.checked })}
                />
                <label htmlFor="requirePhoneVerification" className="mr-2 block text-sm text-gray-900">
                  طلب التحقق من رقم الهاتف
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showRestaurantRatings"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={appSettings.showRestaurantRatings}
                  onChange={(e) => setAppSettings({ ...appSettings, showRestaurantRatings: e.target.checked })}
                />
                <label htmlFor="showRestaurantRatings" className="mr-2 block text-sm text-gray-900">
                  عرض تقييمات المطاعم
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableReviews"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={appSettings.enableReviews}
                  onChange={(e) => setAppSettings({ ...appSettings, enableReviews: e.target.checked })}
                />
                <label htmlFor="enableReviews" className="mr-2 block text-sm text-gray-900">
                  تفعيل المراجعات والتقييمات
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enablePromoCode"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={appSettings.enablePromoCode}
                  onChange={(e) => setAppSettings({ ...appSettings, enablePromoCode: e.target.checked })}
                />
                <label htmlFor="enablePromoCode" className="mr-2 block text-sm text-gray-900">
                  تفعيل رموز الخصم
                </label>
              </div>
              
              <div>
                <label htmlFor="maxItemsPerOrder" className="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى للعناصر في الطلب الواحد</label>
                <input
                  type="number"
                  id="maxItemsPerOrder"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  value={appSettings.maxItemsPerOrder}
                  onChange={(e) => setAppSettings({ ...appSettings, maxItemsPerOrder: parseInt(e.target.value) })}
                />
              </div>
              
              <div className="pt-4">
                <button
                  onClick={() => saveSettings('app')}
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'جاري الحفظ...' : 'حفظ إعدادات التطبيق'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
