import React, { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../config/supabaseClient';

// تعريف أنواع البيانات
interface DeliveryDriver {
  id: number;
  name: string;
  phone: string;
  email: string;
  available: boolean;
  current_location: {
    lat: number;
    lng: number;
  } | null;
  current_order_id: number | null;
}

interface DeliveryTrackingContextType {
  // بيانات السائق
  driverData: DeliveryDriver | null;
  isDriverAvailable: boolean;
  // وظائف تحديث حالة السائق
  toggleDriverAvailability: () => Promise<void>;
  updateDriverLocation: (lat: number, lng: number) => Promise<void>;
  // وظائف تتبع الطلب
  acceptOrder: (orderId: number) => Promise<void>;
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
  completeDelivery: (orderId: number) => Promise<void>;
  // حالة التحميل والأخطاء
  loading: boolean;
  error: string | null;
}

// إنشاء سياق تتبع التوصيل
const DeliveryTrackingContext = createContext<DeliveryTrackingContextType | undefined>(undefined);

// مزود سياق تتبع التوصيل
export const DeliveryTrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // حالة بيانات السائق
  const [driverData, setDriverData] = useState<DeliveryDriver | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // استرجاع بيانات السائق عند التحميل
  useEffect(() => {
    // في التطبيق الحقيقي، سيتم استرجاع بيانات السائق المسجل دخوله
    // هنا نستخدم بيانات وهمية للعرض
    const mockDriverData: DeliveryDriver = {
      id: 1,
      name: 'رامي علي',
      phone: '+963 955 111222',
      email: 'rami@example.com',
      available: true,
      current_location: { lat: 33.5138, lng: 36.2765 },
      current_order_id: null
    };
    
    setDriverData(mockDriverData);
    setLoading(false);
    
    // إعداد اشتراك Supabase Realtime لتحديثات الطلبات
    // في التطبيق الحقيقي، سيتم استخدام هذا لتلقي تحديثات الطلبات الجديدة
    const setupRealtimeSubscription = async () => {
      try {
        // مثال على اشتراك Supabase Realtime
        // const subscription = supabase
        //   .channel('orders')
        //   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, handleNewOrder)
        //   .subscribe();
        
        // return () => {
        //   subscription.unsubscribe();
        // };
      } catch (err) {
        console.error('Error setting up realtime subscription:', err);
        setError('حدث خطأ في إعداد اشتراك التحديثات في الوقت الفعلي');
      }
    };
    
    setupRealtimeSubscription();
  }, []);
  
  // التحقق من توفر السائق
  const isDriverAvailable = driverData?.available || false;
  
  // تبديل حالة توفر السائق
  const toggleDriverAvailability = async () => {
    if (!driverData) return;
    
    try {
      setLoading(true);
      
      // في التطبيق الحقيقي، سيتم تحديث حالة التوفر في قاعدة البيانات
      // هنا نقوم بتحديث الحالة المحلية فقط
      setDriverData({
        ...driverData,
        available: !driverData.available
      });
      
      // مثال على تحديث Supabase
      // await supabase
      //   .from('delivery_drivers')
      //   .update({ available: !driverData.available })
      //   .eq('id', driverData.id);
      
      setLoading(false);
    } catch (err) {
      console.error('Error toggling availability:', err);
      setError('حدث خطأ في تحديث حالة التوفر');
      setLoading(false);
    }
  };
  
  // تحديث موقع السائق
  const updateDriverLocation = async (lat: number, lng: number) => {
    if (!driverData) return;
    
    try {
      setLoading(true);
      
      // في التطبيق الحقيقي، سيتم تحديث الموقع في قاعدة البيانات
      // هنا نقوم بتحديث الحالة المحلية فقط
      setDriverData({
        ...driverData,
        current_location: { lat, lng }
      });
      
      // مثال على تحديث Supabase
      // await supabase
      //   .from('delivery_drivers')
      //   .update({ current_location: { lat, lng } })
      //   .eq('id', driverData.id);
      
      setLoading(false);
    } catch (err) {
      console.error('Error updating location:', err);
      setError('حدث خطأ في تحديث الموقع');
      setLoading(false);
    }
  };
  
  // قبول طلب جديد
  const acceptOrder = async (orderId: number) => {
    if (!driverData) return;
    
    try {
      setLoading(true);
      
      // في التطبيق الحقيقي، سيتم تحديث حالة الطلب وتعيين السائق في قاعدة البيانات
      // هنا نقوم بتحديث الحالة المحلية فقط
      setDriverData({
        ...driverData,
        current_order_id: orderId
      });
      
      // مثال على تحديث Supabase
      // await supabase
      //   .from('orders')
      //   .update({ 
      //     status: 'on_the_way',
      //     delivery_driver_id: driverData.id
      //   })
      //   .eq('id', orderId);
      
      setLoading(false);
    } catch (err) {
      console.error('Error accepting order:', err);
      setError('حدث خطأ في قبول الطلب');
      setLoading(false);
    }
  };
  
  // تحديث حالة الطلب
  const updateOrderStatus = async (orderId: number, status: string) => {
    try {
      setLoading(true);
      
      // في التطبيق الحقيقي، سيتم تحديث حالة الطلب في قاعدة البيانات
      // مثال على تحديث Supabase
      // await supabase
      //   .from('orders')
      //   .update({ status })
      //   .eq('id', orderId);
      
      setLoading(false);
    } catch (err) {
      console.error('Error updating order status:', err);
      setError('حدث خطأ في تحديث حالة الطلب');
      setLoading(false);
    }
  };
  
  // إكمال التوصيل
  const completeDelivery = async (orderId: number) => {
    if (!driverData) return;
    
    try {
      setLoading(true);
      
      // في التطبيق الحقيقي، سيتم تحديث حالة الطلب وإزالة الطلب الحالي من السائق
      // هنا نقوم بتحديث الحالة المحلية فقط
      setDriverData({
        ...driverData,
        current_order_id: null
      });
      
      // مثال على تحديث Supabase
      // await supabase
      //   .from('orders')
      //   .update({ 
      //     status: 'delivered',
      //     delivery_completed_at: new Date().toISOString()
      //   })
      //   .eq('id', orderId);
      
      // await supabase
      //   .from('delivery_drivers')
      //   .update({ current_order_id: null })
      //   .eq('id', driverData.id);
      
      setLoading(false);
    } catch (err) {
      console.error('Error completing delivery:', err);
      setError('حدث خطأ في إكمال التوصيل');
      setLoading(false);
    }
  };
  
  return (
    <DeliveryTrackingContext.Provider
      value={{
        driverData,
        isDriverAvailable,
        toggleDriverAvailability,
        updateDriverLocation,
        acceptOrder,
        updateOrderStatus,
        completeDelivery,
        loading,
        error
      }}
    >
      {children}
    </DeliveryTrackingContext.Provider>
  );
};

// هوك استخدام سياق تتبع التوصيل
export const useDeliveryTracking = () => {
  const context = useContext(DeliveryTrackingContext);
  if (context === undefined) {
    throw new Error('useDeliveryTracking must be used within a DeliveryTrackingProvider');
  }
  return context;
};
