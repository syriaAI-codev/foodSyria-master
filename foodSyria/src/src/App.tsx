import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// استيراد الصفحات
const Landing = React.lazy(() => import('./pages/Landing'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const RestaurantsList = React.lazy(() => import('./pages/customer/RestaurantsList'));
const RestaurantDetails = React.lazy(() => import('./pages/customer/RestaurantDetails'));
const Checkout = React.lazy(() => import('./pages/customer/Checkout'));
const CustomerOrders = React.lazy(() => import('./pages/customer/Orders'));
const RestaurantDashboard = React.lazy(() => import('./pages/restaurant/Dashboard'));
const DeliveryDashboard = React.lazy(() => import('./pages/delivery/Dashboard'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// مكون التحميل
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            {/* الصفحات العامة */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* صفحات العميل */}
            <Route path="/restaurants" element={<RestaurantsList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<CustomerOrders />} />
            
            {/* صفحات المطعم */}
            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/orders" element={<RestaurantDashboard />} />
            <Route path="/restaurant/menu" element={<RestaurantDashboard />} />
            <Route path="/restaurant/profile" element={<RestaurantDashboard />} />
            
            {/* صفحات عامل التوصيل */}
            <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
            <Route path="/delivery/orders" element={<DeliveryDashboard />} />
            <Route path="/delivery/profile" element={<DeliveryDashboard />} />
            
            {/* صفحات المدير */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/restaurants" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminDashboard />} />
            <Route path="/admin/deliveries" element={<AdminDashboard />} />
            
            {/* صفحة غير موجودة */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </React.Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
