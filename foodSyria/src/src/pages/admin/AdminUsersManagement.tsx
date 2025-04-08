import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// صفحة إدارة المستخدمين للمدير
const AdminUsersManagement: React.FC = () => {
  // حالة المستخدمين
  const [users, setUsers] = useState<Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'customer' | 'restaurant' | 'driver' | 'admin';
    status: 'active' | 'inactive' | 'pending' | 'blocked';
    createdAt: string;
    lastActive?: string;
  }>>([
    {
      id: 1,
      name: 'معاذ عبد الرحمن',
      email: 'moaz1993abdulrahman@gmail.com',
      phone: '+963 955 123456',
      role: 'admin',
      status: 'active',
      createdAt: '2025-01-01T10:00:00',
      lastActive: '2025-04-06T15:30:00'
    },
    {
      id: 2,
      name: 'محمد أحمد',
      email: 'mohammad@example.com',
      phone: '+963 955 111222',
      role: 'customer',
      status: 'active',
      createdAt: '2025-03-15T14:30:00',
      lastActive: '2025-04-06T14:20:00'
    },
    {
      id: 3,
      name: 'أحمد محمود',
      email: 'ahmad@example.com',
      phone: '+963 955 222333',
      role: 'customer',
      status: 'active',
      createdAt: '2025-03-18T09:15:00',
      lastActive: '2025-04-05T18:45:00'
    },
    {
      id: 4,
      name: 'علي حسن',
      email: 'ali@example.com',
      phone: '+963 955 333444',
      role: 'customer',
      status: 'active',
      createdAt: '2025-03-20T11:30:00',
      lastActive: '2025-04-06T10:15:00'
    },
    {
      id: 5,
      name: 'مطعم الشام',
      email: 'alsham@example.com',
      phone: '+963 11 1234567',
      role: 'restaurant',
      status: 'active',
      createdAt: '2025-02-10T08:00:00',
      lastActive: '2025-04-06T15:10:00'
    },
    {
      id: 6,
      name: 'مطعم دمشق',
      email: 'damascus@example.com',
      phone: '+963 11 2345678',
      role: 'restaurant',
      status: 'active',
      createdAt: '2025-02-15T09:30:00',
      lastActive: '2025-04-06T14:45:00'
    },
    {
      id: 7,
      name: 'مطعم حلب',
      email: 'aleppo@example.com',
      phone: '+963 11 3456789',
      role: 'restaurant',
      status: 'active',
      createdAt: '2025-02-20T10:15:00',
      lastActive: '2025-04-06T13:20:00'
    },
    {
      id: 8,
      name: 'رامي علي',
      email: 'rami@example.com',
      phone: '+963 955 444555',
      role: 'driver',
      status: 'active',
      createdAt: '2025-03-01T08:45:00',
      lastActive: '2025-04-06T15:25:00'
    },
    {
      id: 9,
      name: 'سامر محمد',
      email: 'samer@example.com',
      phone: '+963 955 555666',
      role: 'driver',
      status: 'active',
      createdAt: '2025-03-05T09:20:00',
      lastActive: '2025-04-06T14:50:00'
    },
    {
      id: 10,
      name: 'خالد أحمد',
      email: 'khaled@example.com',
      phone: '+963 955 666777',
      role: 'driver',
      status: 'active',
      createdAt: '2025-03-10T10:30:00',
      lastActive: '2025-04-06T12:15:00'
    },
    {
      id: 11,
      name: 'مطعم البيت',
      email: 'albait@example.com',
      phone: '+963 11 4567890',
      role: 'restaurant',
      status: 'pending',
      createdAt: '2025-04-05T11:30:00'
    },
    {
      id: 12,
      name: 'فادي سمير',
      email: 'fadi@example.com',
      phone: '+963 955 777888',
      role: 'driver',
      status: 'pending',
      createdAt: '2025-04-06T09:15:00'
    },
    {
      id: 13,
      name: 'سامي حسن',
      email: 'sami@example.com',
      phone: '+963 955 888999',
      role: 'customer',
      status: 'blocked',
      createdAt: '2025-03-25T14:20:00',
      lastActive: '2025-04-01T16:30:00'
    }
  ]);
  
  // حالة التصفية
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });
  
  // حالة المستخدم المحدد للتعديل
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  
  // تصفية المستخدمين حسب المعايير
  const filteredUsers = users.filter(user => {
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesSearch = 
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.phone.includes(filters.search);
    
    return matchesRole && matchesStatus && matchesSearch;
  });
  
  // ترجمة دور المستخدم
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'customer': return { label: 'عميل', color: 'bg-blue-100 text-blue-800' };
      case 'restaurant': return { label: 'مطعم', color: 'bg-purple-100 text-purple-800' };
      case 'driver': return { label: 'سائق', color: 'bg-primary-100 text-primary-800' };
      case 'admin': return { label: 'مدير', color: 'bg-red-100 text-red-800' };
      default: return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // ترجمة حالة المستخدم
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return { label: 'نشط', color: 'bg-green-100 text-green-800' };
      case 'inactive': return { label: 'غير نشط', color: 'bg-gray-100 text-gray-800' };
      case 'pending': return { label: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800' };
      case 'blocked': return { label: 'محظور', color: 'bg-red-100 text-red-800' };
      default: return { label: 'غير معروف', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // تنسيق التاريخ والوقت
  const formatDateTime = (dateTimeString?: string) => {
    if (!dateTimeString) return 'غير متوفر';
    
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('ar-SY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // حساب الوقت المنقضي منذ آخر نشاط
  const getTimeElapsed = (dateTimeString?: string) => {
    if (!dateTimeString) return 'غير متوفر';
    
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) {
      return 'الآن';
    } else if (diffMins === 1) {
      return 'منذ دقيقة واحدة';
    } else if (diffMins < 60) {
      return `منذ ${diffMins} دقيقة`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours === 1) {
        return 'منذ ساعة واحدة';
      } else if (diffHours < 24) {
        return `منذ ${diffHours} ساعة`;
      } else {
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) {
          return 'منذ يوم واحد';
        } else {
          return `منذ ${diffDays} يوم`;
        }
      }
    }
  };
  
  // تغيير حالة المستخدم
  const changeUserStatus = (userId: number, newStatus: 'active' | 'inactive' | 'pending' | 'blocked') => {
    // في التطبيق الحقيقي، سيتم تحديث قاعدة البيانات
    // هنا نقوم بتحديث الحالة المحلية فقط
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setSelectedUser(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary-600">فود سوريا</a>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">لوحة تحكم المدير - إدارة المستخدمين</span>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="/admin/dashboard" className="text-gray-600 hover:text-primary-600">لوحة التحكم</a>
            <a href="/admin/tracking" className="text-gray-600 hover:text-primary-600">تتبع الطلبات</a>
            <a href="/admin/restaurants" className="text-gray-600 hover:text-primary-600">المطاعم</a>
            <a href="/admin/settings" className="text-gray-600 hover:text-primary-600">الإعدادات</a>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="mt-2 text-gray-600">إدارة جميع المستخدمين في النظام (العملاء، المطاعم، السائقين، المدراء)</p>
        </div>
        
        {/* أدوات البحث والتصفية */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">البحث</label>
              <input
                type="text"
                id="search"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="ابحث بالاسم، البريد الإلكتروني، الهاتف..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
              <select
                id="role"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              >
                <option value="all">جميع الأدوار</option>
                <option value="customer">العملاء</option>
                <option value="restaurant">المطاعم</option>
                <option value="driver">السائقين</option>
                <option value="admin">المدراء</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
              <select
                id="status"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="pending">قيد المراجعة</option>
                <option value="blocked">محظور</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => setFilters({ role: 'all', status: 'all', search: '' })}
                className="btn-outline w-full"
              >
                إعادة تعيين الفلاتر
              </button>
            </div>
          </div>
        </div>
        
        {/* قائمة المستخدمين */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">المستخدمين ({filteredUsers.length})</h2>
          </div>
          
          {filteredUsers.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">لا يوجد مستخدمين يطابقون معايير البحث الحالية</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستخدم
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الدور
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ التسجيل
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      آخر نشاط
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold ml-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleLabel(user.role).color}`}>
                          {getRoleLabel(user.role).label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusLabel(user.status).color}`}>
                          {getStatusLabel(user.status).label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive ? getTimeElapsed(user.lastActive) : 'غير متوفر'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                          className="text-primary-600 hover:text-primary-900 ml-3"
                        >
                          إدارة
                        </button>
                        <a
                          href={`/admin/users/${user.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          عرض
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      {/* نافذة منبثقة لإدارة المستخدم */}
      {selectedUser !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            {(() => {
              const user = users.find(u => u.id === selectedUser);
              if (!user) return null;
              
              return (
                <>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">إدارة المستخدم</h3>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg ml-4">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">الدور</p>
                          <p className="font-medium">{getRoleLabel(user.role).label}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">الحالة الحالية</p>
                          <p className="font-medium">{getStatusLabel(user.status).label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">تغيير حالة المستخدم</h4>
                    
                    <div className="space-y-3">
                      {user.status !== 'active' && (
                        <button
                          onClick={() => changeUserStatus(user.id, 'active')}
                          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          تنشيط الحساب
                        </button>
                      )}
                      
                      {user.status !== 'inactive' && (
                        <button
                          onClick={() => changeUserStatus(user.id, 'inactive')}
                          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                          تعطيل الحساب
                        </button>
                      )}
                      
                      {user.status !== 'blocked' && (
                        <button
                          onClick={() => changeUserStatus(user.id, 'blocked')}
                          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          حظر الحساب
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersManagement;
