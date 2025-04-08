import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LocationPicker from '../../components/maps/LocationPicker';

// صفحة إدارة الملف الشخصي للمطعم
const RestaurantProfile: React.FC = () => {
  const navigate = useNavigate();
  
  // مفتاح Google Maps API
  const googleMapsApiKey = 'AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8';
  
  // حالة بيانات المطعم
  const [restaurant, setRestaurant] = useState({
    id: 1,
    name: 'مطعم الشام',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'مطعم الشام يقدم أشهى المأكولات الشرقية والمشاوي السورية الأصيلة بنكهات تقليدية وأجواء عائلية دافئة.',
    categories: ['شرقي', 'مشاوي', 'عربي'],
    priceLevel: 'متوسط',
    address: 'دمشق، شارع الثورة، بناء رقم 15',
    location: { lat: 33.5138, lng: 36.2765 },
    phone: '+963 11 1234567',
    email: 'info@shaam-restaurant.com',
    workingHours: {
      sunday: { open: '10:00', close: '23:00', isOpen: true },
      monday: { open: '10:00', close: '23:00', isOpen: true },
      tuesday: { open: '10:00', close: '23:00', isOpen: true },
      wednesday: { open: '10:00', close: '23:00', isOpen: true },
      thursday: { open: '10:00', close: '23:00', isOpen: true },
      friday: { open: '10:00', close: '23:00', isOpen: true },
      saturday: { open: '10:00', close: '23:00', isOpen: true },
    },
    deliveryFee: 2000,
    minOrderAmount: 10000,
    averageDeliveryTime: 45,
    owner: {
      name: 'محمد الأحمد',
      phone: '+963 955 123456',
      email: 'mohammad@example.com',
    }
  });
  
  // حالة التبويب النشط
  const [activeTab, setActiveTab] = useState<string>('basic');
  
  // حالة التعديل
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // حالة الفئات
  const [newCategory, setNewCategory] = useState<string>('');
  
  // معالج إضافة فئة جديدة
  const handleAddCategory = () => {
    if (newCategory.trim() === '') return;
    
    setRestaurant({
      ...restaurant,
      categories: [...restaurant.categories, newCategory.trim()]
    });
    
    setNewCategory('');
  };
  
  // معالج حذف فئة
  const handleRemoveCategory = (index: number) => {
    const updatedCategories = [...restaurant.categories];
    updatedCategories.splice(index, 1);
    
    setRestaurant({
      ...restaurant,
      categories: updatedCategories
    });
  };
  
  // معالج تحديث موقع المطعم
  const handleLocationUpdate = (location: { lat: number; lng: number; address: string }) => {
    setRestaurant({
      ...restaurant,
      location: { lat: location.lat, lng: location.lng },
      address: location.address
    });
  };
  
  // معالج حفظ التغييرات
  const handleSaveChanges = () => {
    // هنا سيتم إرسال البيانات المحدثة إلى الخادم
    setIsEditing(false);
    alert('تم حفظ التغييرات بنجاح');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/restaurant/dashboard" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">الملف الشخصي</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/restaurant/menu" className="text-gray-600 hover:text-primary-600">إدارة القائمة</a>
            <a href="/restaurant/orders" className="text-gray-600 hover:text-primary-600">الطلبات</a>
            <button className="btn-outline">تسجيل الخروج</button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">الملف الشخصي للمطعم</h1>
          <div>
            {isEditing ? (
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-outline"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="btn-primary"
                >
                  حفظ التغييرات
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                تعديل الملف الشخصي
              </button>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'basic'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                المعلومات الأساسية
              </button>
              <button
                onClick={() => setActiveTab('location')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'location'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                الموقع والعنوان
              </button>
              <button
                onClick={() => setActiveTab('hours')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'hours'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ساعات العمل
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'delivery'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                التوصيل
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* المعلومات الأساسية */}
            {activeTab === 'basic' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">معلومات المطعم</h2>
                    
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        اسم المطعم
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="name"
                          value={restaurant.name}
                          onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.name}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        وصف المطعم
                      </label>
                      {isEditing ? (
                        <textarea
                          id="description"
                          value={restaurant.description}
                          onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
                          rows={3}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        ></textarea>
                      ) : (
                        <p className="text-gray-900">{restaurant.description}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        رقم الهاتف
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="phone"
                          value={restaurant.phone}
                          onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.phone}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        البريد الإلكتروني
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          id="email"
                          value={restaurant.email}
                          onChange={(e) => setRestaurant({ ...restaurant, email: e.target.value })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.email}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="priceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        مستوى الأسعار
                      </label>
                      {isEditing ? (
                        <select
                          id="priceLevel"
                          value={restaurant.priceLevel}
                          onChange={(e) => setRestaurant({ ...restaurant, priceLevel: e.target.value })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        >
                          <option value="اقتصادي">اقتصادي</option>
                          <option value="متوسط">متوسط</option>
                          <option value="مرتفع">مرتفع</option>
                          <option value="فاخر">فاخر</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{restaurant.priceLevel}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">الصور</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        شعار المطعم
                      </label>
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full overflow-hidden ml-4">
                          <img src={restaurant.logo} alt="شعار المطعم" className="h-full w-full object-cover" />
                        </div>
                        {isEditing && (
                          <button className="btn-outline-sm">
                            تغيير الشعار
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        صورة الغلاف
                      </label>
                      <div className="h-40 rounded-lg overflow-hidden mb-2">
                        <img src={restaurant.cover} alt="صورة الغلاف" className="h-full w-full object-cover" />
                      </div>
                      {isEditing && (
                        <button className="btn-outline-sm">
                          تغيير صورة الغلاف
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        فئات المطعم
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {restaurant.categories.map((category, index) => (
                          <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                            {category}
                            {isEditing && (
                              <button
                                onClick={() => handleRemoveCategory(index)}
                                className="ml-1 text-primary-600 hover:text-primary-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {isEditing && (
                        <div className="flex mt-2">
                          <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 ml-2"
                            placeholder="فئة جديدة"
                          />
                          <button
                            onClick={handleAddCategory}
                            className="btn-primary-sm"
                            disabled={newCategory.trim() === ''}
                          >
                            إضافة
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* الموقع والعنوان */}
            {activeTab === 'location' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">الموقع والعنوان</h2>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    العنوان
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="address"
                      value={restaurant.address}
                      onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 mb-4"
                    />
                  ) : (
                    <p className="text-gray-900 mb-4">{restaurant.address}</p>
                  )}
                  
                  {isEditing ? (
                    <LocationPicker
                      apiKey={googleMapsApiKey}
                      initialLocation={{
                        lat: restaurant.location.lat,
                        lng: restaurant.location.lng,
                        address: restaurant.address
                      }}
                      onLocationSelect={handleLocationUpdate}
                    />
                  ) : (
                    <div className="h-80 rounded-lg overflow-hidden">
                      <iframe
                        title="موقع المطعم"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${restaurant.location.lat},${restaurant.location.lng}&language=ar`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* ساعات العمل */}
            {activeTab === 'hours' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">ساعات العمل</h2>
                
                <div className="space-y-4">
                  {Object.entries(restaurant.workingHours).map(([day, hours]) => {
                    const dayNames: { [key: string]: string } = {
                      sunday: 'الأحد',
                      monday: 'الاثنين',
                      tuesday: 'الثلاثاء',
                      wednesday: 'الأربعاء',
                      thursday: 'الخميس',
                      friday: 'الجمعة',
                      saturday: 'السبت'
                    };
                    
                    return (
                      <div key={day} className="flex items-center">
                        <div className="w-24 font-medium text-gray-700">{dayNames[day]}</div>
                        
                        {isEditing ? (
                          <>
                            <div className="flex items-center ml-4">
                              <input
                                type="checkbox"
                                id={`isOpen-${day}`}
                                checked={hours.isOpen}
                                onChange={(e) => {
                                  const updatedHours = { ...restaurant.workingHours };
                                  updatedHours[day as keyof typeof updatedHours].isOpen = e.target.checked;
                                  setRestaurant({ ...restaurant, workingHours: updatedHours });
                                }}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2"
                              />
                              <label htmlFor={`isOpen-${day}`} className="text-sm text-gray-700">
                                مفتوح
                              </label>
                            </div>
                            
                            {hours.isOpen && (
                              <div className="flex items-center space-x-2 space-x-reverse mr-4">
                                <div className="flex items-center">
                                  <label htmlFor={`open-${day}`} className="text-sm text-gray-700 ml-1">من</label>
                                  <input
                                    type="time"
                                    id={`open-${day}`}
                                    value={hours.open}
                                    onChange={(e) => {
                                      const updatedHours = { ...restaurant.workingHours };
                                      updatedHours[day as keyof typeof updatedHours].open = e.target.value;
                                      setRestaurant({ ...restaurant, workingHours: updatedHours });
                                    }}
                                    className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                  />
                                </div>
                                
                                <div className="flex items-center">
                                  <label htmlFor={`close-${day}`} className="text-sm text-gray-700 ml-1">إلى</label>
                                  <input
                                    type="time"
                                    id={`close-${day}`}
                                    value={hours.close}
                                    onChange={(e) => {
                                      const updatedHours = { ...restaurant.workingHours };
                                      updatedHours[day as keyof typeof updatedHours].close = e.target.value;
                                      setRestaurant({ ...restaurant, workingHours: updatedHours });
                                    }}
                                    className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-gray-900">
                            {hours.isOpen ? `${hours.open} - ${hours.close}` : 'مغلق'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
            
            {/* التوصيل */}
            {activeTab === 'delivery' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-4">إعدادات التوصيل</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700 mb-1">
                        رسوم التوصيل (ل.س)
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          id="deliveryFee"
                          value={restaurant.deliveryFee}
                          onChange={(e) => setRestaurant({ ...restaurant, deliveryFee: parseInt(e.target.value) || 0 })}
                          min="0"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.deliveryFee} ل.س</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700 mb-1">
                        الحد الأدنى للطلب (ل.س)
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          id="minOrderAmount"
                          value={restaurant.minOrderAmount}
                          onChange={(e) => setRestaurant({ ...restaurant, minOrderAmount: parseInt(e.target.value) || 0 })}
                          min="0"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.minOrderAmount} ل.س</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="averageDeliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                        متوسط وقت التوصيل (دقيقة)
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          id="averageDeliveryTime"
                          value={restaurant.averageDeliveryTime}
                          onChange={(e) => setRestaurant({ ...restaurant, averageDeliveryTime: parseInt(e.target.value) || 0 })}
                          min="0"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.averageDeliveryTime} دقيقة</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">معلومات المالك</h3>
                    
                    <div className="mb-4">
                      <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                        اسم المالك
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="ownerName"
                          value={restaurant.owner.name}
                          onChange={(e) => setRestaurant({
                            ...restaurant,
                            owner: { ...restaurant.owner, name: e.target.value }
                          })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.owner.name}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                        رقم هاتف المالك
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="ownerPhone"
                          value={restaurant.owner.phone}
                          onChange={(e) => setRestaurant({
                            ...restaurant,
                            owner: { ...restaurant.owner, phone: e.target.value }
                          })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.owner.phone}</p>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                        البريد الإلكتروني للمالك
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          id="ownerEmail"
                          value={restaurant.owner.email}
                          onChange={(e) => setRestaurant({
                            ...restaurant,
                            owner: { ...restaurant.owner, email: e.target.value }
                          })}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="text-gray-900">{restaurant.owner.email}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantProfile;
