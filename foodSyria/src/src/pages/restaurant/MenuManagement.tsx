import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// صفحة إدارة قائمة المطعم
const MenuManagement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // حالة فئات القائمة
  const [categories, setCategories] = useState<Array<{
    id: number;
    name: string;
    items: Array<{
      id: number;
      name: string;
      description: string;
      price: number;
      image: string;
      available: boolean;
    }>;
  }>>([
    {
      id: 1,
      name: 'المقبلات',
      items: [
        { id: 101, name: 'حمص', description: 'حمص مع زيت زيتون وصنوبر', price: 2500, image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80', available: true },
        { id: 102, name: 'متبل', description: 'متبل باذنجان مع رمان', price: 2500, image: 'https://images.unsplash.com/photo-1628960198207-27ead1b96700?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', available: true },
        { id: 103, name: 'تبولة', description: 'تبولة طازجة مع بقدونس وبرغل', price: 3000, image: 'https://images.unsplash.com/photo-1608542032136-61caa9b3ff2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', available: true },
      ]
    },
    {
      id: 2,
      name: 'المشاوي',
      items: [
        { id: 201, name: 'كباب حلبي', description: 'كباب لحم غنم مع بهارات حلبية', price: 12000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', available: true },
        { id: 202, name: 'شيش طاووق', description: 'قطع دجاج متبلة مشوية على الفحم', price: 10000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', available: true },
        { id: 203, name: 'مشاوي مشكلة', description: 'تشكيلة من المشاوي المتنوعة', price: 25000, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80', available: true },
      ]
    },
    {
      id: 3,
      name: 'المشروبات',
      items: [
        { id: 301, name: 'عصير ليمون', description: 'عصير ليمون طازج مع نعناع', price: 1500, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', available: true },
        { id: 302, name: 'عصير برتقال', description: 'عصير برتقال طازج', price: 2000, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', available: true },
        { id: 303, name: 'مياه معدنية', description: 'زجاجة مياه معدنية', price: 500, image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80', available: true },
      ]
    }
  ]);
  
  // حالة الفئة المحددة للتعديل
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  // حالة العنصر المحدد للتعديل
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    image: string;
    available: boolean;
  } | null>(null);
  
  // حالة إضافة فئة جديدة
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  
  // حالة إضافة عنصر جديد
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [newItemCategoryId, setNewItemCategoryId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState<{
    name: string;
    description: string;
    price: number;
    image: string;
    available: boolean;
  }>({
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true
  });
  
  // معالج إضافة فئة جديدة
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    setCategories([...categories, {
      id: newId,
      name: newCategoryName,
      items: []
    }]);
    
    setNewCategoryName('');
    setIsAddingCategory(false);
  };
  
  // معالج حذف فئة
  const handleDeleteCategory = (categoryId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفئة وجميع عناصرها؟')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };
  
  // معالج تعديل فئة
  const handleEditCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setNewCategoryName(category.name);
    }
  };
  
  // معالج حفظ تعديل الفئة
  const handleSaveCategory = () => {
    if (selectedCategory === null || newCategoryName.trim() === '') return;
    
    setCategories(categories.map(c => 
      c.id === selectedCategory ? { ...c, name: newCategoryName } : c
    ));
    
    setSelectedCategory(null);
    setNewCategoryName('');
  };
  
  // معالج إضافة عنصر جديد
  const handleAddItem = () => {
    if (newItemCategoryId === null || newItem.name.trim() === '') return;
    
    const categoryIndex = categories.findIndex(c => c.id === newItemCategoryId);
    if (categoryIndex === -1) return;
    
    const newId = Math.max(...categories.flatMap(c => c.items.map(i => i.id)), 0) + 1;
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].items.push({
      id: newId,
      ...newItem
    });
    
    setCategories(updatedCategories);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      image: '',
      available: true
    });
    setIsAddingItem(false);
    setNewItemCategoryId(null);
  };
  
  // معالج تعديل عنصر
  const handleEditItem = (categoryId: number, itemId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const item = category.items.find(i => i.id === itemId);
    if (!item) return;
    
    setSelectedItem({
      id: item.id,
      categoryId,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      available: item.available
    });
  };
  
  // معالج حفظ تعديل العنصر
  const handleSaveItem = () => {
    if (selectedItem === null) return;
    
    const categoryIndex = categories.findIndex(c => c.id === selectedItem.categoryId);
    if (categoryIndex === -1) return;
    
    const updatedCategories = [...categories];
    const itemIndex = updatedCategories[categoryIndex].items.findIndex(i => i.id === selectedItem.id);
    if (itemIndex === -1) return;
    
    updatedCategories[categoryIndex].items[itemIndex] = {
      id: selectedItem.id,
      name: selectedItem.name,
      description: selectedItem.description,
      price: selectedItem.price,
      image: selectedItem.image,
      available: selectedItem.available
    };
    
    setCategories(updatedCategories);
    setSelectedItem(null);
  };
  
  // معالج حذف عنصر
  const handleDeleteItem = (categoryId: number, itemId: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      const categoryIndex = categories.findIndex(c => c.id === categoryId);
      if (categoryIndex === -1) return;
      
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].items = updatedCategories[categoryIndex].items.filter(i => i.id !== itemId);
      
      setCategories(updatedCategories);
    }
  };
  
  // معالج تغيير توفر العنصر
  const handleToggleItemAvailability = (categoryId: number, itemId: number) => {
    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex === -1) return;
    
    const updatedCategories = [...categories];
    const itemIndex = updatedCategories[categoryIndex].items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;
    
    updatedCategories[categoryIndex].items[itemIndex].available = !updatedCategories[categoryIndex].items[itemIndex].available;
    
    setCategories(updatedCategories);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/restaurant/dashboard" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">إدارة القائمة</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/restaurant/profile" className="text-gray-600 hover:text-primary-600">الملف الشخصي</a>
            <a href="/restaurant/orders" className="text-gray-600 hover:text-primary-600">الطلبات</a>
            <button className="btn-outline">تسجيل الخروج</button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">إدارة قائمة الطعام</h1>
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="btn-primary-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              إضافة فئة جديدة
            </button>
            <button
              onClick={() => {
                setIsAddingItem(true);
                setNewItemCategoryId(categories.length > 0 ? categories[0].id : null);
              }}
              className="btn-primary flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              إضافة عنصر جديد
            </button>
          </div>
        </div>
        
        {/* قائمة الفئات والعناصر */}
        <div className="space-y-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                {selectedCategory === category.id ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="اسم الفئة"
                    />
                    <button
                      onClick={handleSaveCategory}
                      className="text-green-600 hover:text-green-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setNewCategoryName('');
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                )}
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEditCategory(category.id)}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {category.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    لا توجد عناصر في هذه الفئة
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`border ${item.available ? 'border-gray-200' : 'border-red-200 bg-red-50'} rounded-lg overflow-hidden flex`}
                      >
                        <div className="w-1/3 h-32">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-2/3 p-4 flex flex-col">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <div className="flex space-x-1 space-x-reverse">
                              <button
                                onClick={() => handleToggleItemAvailability(category.id, item.id)}
                                className={`${item.available ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'}`}
                                title={item.available ? 'متوفر' : 'غير متوفر'}
                              >
                                {item.available ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </button>
                              <button
                                onClick={() => handleEditItem(category.id, item.id)}
                                className="text-primary-600 hover:text-primary-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteItem(category.id, item.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                          <div className="mt-auto">
                            <span className="text-primary-600 font-bold">{item.price} ل.س</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {categories.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد فئات في القائمة</h3>
              <p className="text-gray-500 mb-4">ابدأ بإضافة فئة جديدة لقائمة طعامك</p>
              <button
                onClick={() => setIsAddingCategory(true)}
                className="btn-primary"
              >
                إضافة فئة جديدة
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* نافذة إضافة فئة جديدة */}
      {isAddingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">إضافة فئة جديدة</h2>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                اسم الفئة
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="مثال: المقبلات، المشاوي، المشروبات"
              />
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <button
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName('');
                }}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddCategory}
                className="btn-primary"
                disabled={newCategoryName.trim() === ''}
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* نافذة إضافة عنصر جديد */}
      {isAddingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">إضافة عنصر جديد</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="itemCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  الفئة
                </label>
                <select
                  id="itemCategory"
                  value={newItemCategoryId || ''}
                  onChange={(e) => setNewItemCategoryId(parseInt(e.target.value))}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                  اسم العنصر
                </label>
                <input
                  type="text"
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="مثال: حمص، كباب حلبي"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف
                </label>
                <textarea
                  id="itemDescription"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  rows={2}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="وصف مختصر للعنصر"
                ></textarea>
              </div>
              <div>
                <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  السعر (ل.س)
                </label>
                <input
                  type="number"
                  id="itemPrice"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="مثال: 2500"
                />
              </div>
              <div>
                <label htmlFor="itemImage" className="block text-sm font-medium text-gray-700 mb-1">
                  رابط الصورة
                </label>
                <input
                  type="text"
                  id="itemImage"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="رابط صورة العنصر"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="itemAvailable"
                    checked={newItem.available}
                    onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2"
                  />
                  <label htmlFor="itemAvailable" className="text-sm text-gray-700">
                    متوفر للطلب
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <button
                onClick={() => {
                  setIsAddingItem(false);
                  setNewItem({
                    name: '',
                    description: '',
                    price: 0,
                    image: '',
                    available: true
                  });
                  setNewItemCategoryId(null);
                }}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddItem}
                className="btn-primary"
                disabled={newItem.name.trim() === '' || newItemCategoryId === null}
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* نافذة تعديل عنصر */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">تعديل عنصر</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="editItemCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  الفئة
                </label>
                <select
                  id="editItemCategory"
                  value={selectedItem.categoryId}
                  onChange={(e) => setSelectedItem({ ...selectedItem, categoryId: parseInt(e.target.value) })}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="editItemName" className="block text-sm font-medium text-gray-700 mb-1">
                  اسم العنصر
                </label>
                <input
                  type="text"
                  id="editItemName"
                  value={selectedItem.name}
                  onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="editItemDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  الوصف
                </label>
                <textarea
                  id="editItemDescription"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                  rows={2}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="editItemPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  السعر (ل.س)
                </label>
                <input
                  type="number"
                  id="editItemPrice"
                  value={selectedItem.price}
                  onChange={(e) => setSelectedItem({ ...selectedItem, price: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="editItemImage" className="block text-sm font-medium text-gray-700 mb-1">
                  رابط الصورة
                </label>
                <input
                  type="text"
                  id="editItemImage"
                  value={selectedItem.image}
                  onChange={(e) => setSelectedItem({ ...selectedItem, image: e.target.value })}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editItemAvailable"
                    checked={selectedItem.available}
                    onChange={(e) => setSelectedItem({ ...selectedItem, available: e.target.checked })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2"
                  />
                  <label htmlFor="editItemAvailable" className="text-sm text-gray-700">
                    متوفر للطلب
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <button
                onClick={() => setSelectedItem(null)}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveItem}
                className="btn-primary"
                disabled={selectedItem.name.trim() === ''}
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
