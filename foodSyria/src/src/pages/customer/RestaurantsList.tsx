import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

// مكون قائمة المطاعم
const RestaurantsList: React.FC = () => {
  // بيانات وهمية للمطاعم
  const restaurants = [
    {
      id: 1,
      name: 'مطعم الشام',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      rating: 4.8,
      deliveryTime: '30-45',
      categories: ['شرقي', 'مشاوي', 'عربي'],
      minOrder: 15
    },
    {
      id: 2,
      name: 'بيتزا هت',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      rating: 4.5,
      deliveryTime: '20-35',
      categories: ['بيتزا', 'إيطالي', 'وجبات سريعة'],
      minOrder: 20
    },
    {
      id: 3,
      name: 'سوشي ماستر',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      deliveryTime: '40-55',
      categories: ['سوشي', 'ياباني', 'آسيوي'],
      minOrder: 25
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">المطاعم</h1>
          <p className="mt-2 text-gray-600">اكتشف أفضل المطاعم في منطقتك</p>
        </div>
        
        {/* فلتر البحث */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="form-label">البحث</label>
              <input
                type="text"
                id="search"
                placeholder="ابحث عن مطعم أو نوع طعام..."
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="category" className="form-label">التصنيف</label>
              <select id="category" className="input-field">
                <option value="">جميع التصنيفات</option>
                <option value="arabic">عربي</option>
                <option value="fast-food">وجبات سريعة</option>
                <option value="italian">إيطالي</option>
                <option value="asian">آسيوي</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="form-label">الترتيب حسب</label>
              <select id="sort" className="input-field">
                <option value="rating">التقييم</option>
                <option value="delivery-time">وقت التوصيل</option>
                <option value="min-order">الحد الأدنى للطلب</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* قائمة المطاعم */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                  <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-full text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {restaurant.rating}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {restaurant.categories.map((category, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {restaurant.deliveryTime} دقيقة
                  </div>
                  <div>
                    الحد الأدنى للطلب: {restaurant.minOrder} ل.س
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/restaurants/${restaurant.id}`}
                    className="btn-primary w-full text-center"
                  >
                    عرض القائمة
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RestaurantsList;
