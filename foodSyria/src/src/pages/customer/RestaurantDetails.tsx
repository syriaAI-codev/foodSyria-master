import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import GoogleMapsComponent from '../../components/maps/GoogleMapsComponent';

// صفحة تفاصيل المطعم
const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState({
    id: parseInt(id || '0'),
    name: 'مطعم الشام',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    description: 'مطعم الشام يقدم أشهى المأكولات الشرقية والمشاوي السورية الأصيلة بنكهات تقليدية وأجواء عائلية دافئة.',
    categories: ['شرقي', 'مشاوي', 'عربي'],
    rating: 4.8,
    reviewsCount: 256,
    priceLevel: 'متوسط',
    address: 'دمشق، شارع الثورة، بناء رقم 15',
    phone: '+963 11 1234567',
    workingHours: '10:00 صباحاً - 11:00 مساءً',
    location: { lat: 33.5138, lng: 36.2765 },
    menu: [
      {
        id: 1,
        category: 'المقبلات',
        items: [
          { id: 101, name: 'حمص', description: 'حمص مع زيت زيتون وصنوبر', price: 2500, image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80' },
          { id: 102, name: 'متبل', description: 'متبل باذنجان مع رمان', price: 2500, image: 'https://images.unsplash.com/photo-1628960198207-27ead1b96700?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80' },
          { id: 103, name: 'تبولة', description: 'تبولة طازجة مع بقدونس وبرغل', price: 3000, image: 'https://images.unsplash.com/photo-1608542032136-61caa9b3ff2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        ]
      },
      {
        id: 2,
        category: 'المشاوي',
        items: [
          { id: 201, name: 'كباب حلبي', description: 'كباب لحم غنم مع بهارات حلبية', price: 12000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' },
          { id: 202, name: 'شيش طاووق', description: 'قطع دجاج متبلة مشوية على الفحم', price: 10000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
          { id: 203, name: 'مشاوي مشكلة', description: 'تشكيلة من المشاوي المتنوعة', price: 25000, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' },
        ]
      }
    ]
  });

  // حالة سلة التسوق
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number }>>([]);
  // حالة التبويب النشط
  const [activeTab, setActiveTab] = useState<string>('menu');
  // مفتاح Google Maps API
  const googleMapsApiKey = 'AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8';

  // إضافة عنصر إلى سلة التسوق
  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // حساب إجمالي سلة التسوق
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/orders" className="text-gray-600 hover:text-primary-600">طلباتي</a>
            <a href="/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
            <button className="btn-outline">تسجيل الخروج</button>
          </div>
        </div>
      </header>
      
      <div className="relative h-64 md:h-80">
        <img 
          src={restaurant.cover} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center">
            <img 
              src={restaurant.logo} 
              alt={restaurant.name} 
              className="w-20 h-20 rounded-full border-4 border-white object-cover ml-4"
            />
            <div>
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="mr-1">{restaurant.rating}</span>
                  <span className="text-gray-300 mr-1">({restaurant.reviewsCount} تقييم)</span>
                </div>
                <span className="mx-2">•</span>
                <span>{restaurant.priceLevel}</span>
                <span className="mx-2">•</span>
                <div className="flex flex-wrap">
                  {restaurant.categories.map((category, index) => (
                    <span key={index} className="ml-1">{category}{index < restaurant.categories.length - 1 ? '،' : ''}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('menu')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'menu'
                        ? 'border-b-2 border-primary-600 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    القائمة
                  </button>
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'info'
                        ? 'border-b-2 border-primary-600 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    معلومات المطعم
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'border-b-2 border-primary-600 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    التقييمات
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {activeTab === 'menu' && (
                  <div>
                    {restaurant.menu.map((category) => (
                      <div key={category.id} className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.items.map((item) => (
                            <div key={item.id} className="flex border border-gray-200 rounded-lg overflow-hidden">
                              <div className="w-1/3">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="w-2/3 p-4">
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-primary-600 font-bold">{item.price} ل.س</span>
                                  <button
                                    onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                                    className="btn-primary-sm"
                                  >
                                    إضافة
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'info' && (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">عن المطعم</h2>
                      <p className="text-gray-600">{restaurant.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">معلومات الاتصال</h3>
                        <div className="flex items-start mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <div>
                            <p className="text-gray-900">{restaurant.phone}</p>
                            <a href={`tel:${restaurant.phone}`} className="text-primary-600 text-sm">اتصل الآن</a>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-gray-900">ساعات العمل</p>
                            <p className="text-gray-600 text-sm">{restaurant.workingHours}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">العنوان</h3>
                        <div className="flex items-start mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 ml-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p className="text-gray-900">{restaurant.address}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden h-64">
                      <GoogleMapsComponent
                        apiKey={googleMapsApiKey}
                        markers={[
                          {
                            id: 1,
                            position: restaurant.location,
                            title: restaurant.name,
                          }
                        ]}
                      />
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="ml-4">
                        <div className="flex items-center">
                          <span className="text-3xl font-bold text-gray-900">{restaurant.rating}</span>
                          <span className="text-gray-500 mr-1">/ 5</span>
                        </div>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={i < Math.floor(restaurant.rating) ? 'currentColor' : 'none'}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{restaurant.reviewsCount} تقييم</p>
                      </div>
                      <div className="mr-auto">
                        <button className="btn-primary">إضافة تقييم</button>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                            م
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">محمد أحمد</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <div className="flex text-yellow-400 ml-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < 5 ? 'currentColor' : 'none'}>
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span>منذ 3 أيام</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">طعام رائع وخدمة ممتازة! المشاوي طازجة ولذيذة جداً، والأجواء مريحة ومناسبة للعائلات. سأعود بالتأكيد مرة أخرى.</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                            س
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">سارة خالد</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <div className="flex text-yellow-400 ml-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < 4 ? 'currentColor' : 'none'}>
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span>منذ أسبوع</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">المقبلات لذيذة جداً خاصة التبولة والحمص. الأسعار معقولة مقارنة بجودة الطعام. الخدمة كانت جيدة لكن كان هناك تأخير بسيط في تقديم الطلبات.</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                            ع
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">علي محمود</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <div className="flex text-yellow-400 ml-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < 5 ? 'currentColor' : 'none'}>
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span>منذ شهر</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">من أفضل المطاعم في المنطقة! الكباب الحلبي رائع والمشاوي المشكلة تستحق التجربة. الموظفون ودودون والمكان نظيف ومرتب. أنصح به بشدة.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">سلة الطلبات</h2>
              </div>
              
              {cart.length === 0 ? (
                <div className="p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500">سلة الطلبات فارغة</p>
                  <p className="text-sm text-gray-400 mt-1">أضف بعض العناصر من القائمة</p>
                </div>
              ) : (
                <>
                  <div className="p-4 max-h-80 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <div className="flex items-center mt-1">
                            <button className="text-gray-500 hover:text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <span className="mx-2 text-gray-600">{item.quantity}</span>
                            <button className="text-gray-500 hover:text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{item.price * item.quantity} ل.س</p>
                          <button className="text-red-500 text-sm hover:text-red-700">
                            حذف
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="font-medium">{calculateTotal()} ل.س</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">رسوم التوصيل:</span>
                      <span className="font-medium">2000 ل.س</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>الإجمالي:</span>
                      <span>{calculateTotal() + 2000} ل.س</span>
                    </div>
                    
                    <button className="btn-primary w-full mt-4">
                      متابعة الطلب
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetails;
