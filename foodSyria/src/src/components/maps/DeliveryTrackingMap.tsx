import React, { useState, useEffect } from 'react';
import { useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import GoogleMapsComponent from './GoogleMapsComponent';

// واجهة خصائص مكون تتبع التوصيل
interface DeliveryTrackingMapProps {
  apiKey: string;
  origin: { lat: number; lng: number; name: string }; // موقع المطعم
  destination: { lat: number; lng: number; name: string }; // موقع العميل
  deliveryLocation?: { lat: number; lng: number }; // موقع عامل التوصيل الحالي (اختياري)
  className?: string;
}

// مكتبات Google Maps المطلوبة
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

// مكون خريطة تتبع التوصيل
const DeliveryTrackingMap: React.FC<DeliveryTrackingMapProps> = ({
  apiKey,
  origin,
  destination,
  deliveryLocation,
  className = "",
}) => {
  // تحميل API الخرائط
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
    language: 'ar',
    region: 'SY',
  });

  // حالة الاتجاهات
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  // حالة طلب الاتجاهات
  const [directionsCallback, setDirectionsCallback] = useState<boolean>(true);

  // إعداد العلامات على الخريطة
  const markers = [
    {
      id: 1,
      position: { lat: origin.lat, lng: origin.lng },
      title: `المطعم: ${origin.name}`,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    },
    {
      id: 2,
      position: { lat: destination.lat, lng: destination.lng },
      title: `العميل: ${destination.name}`,
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    },
  ];

  // إضافة علامة عامل التوصيل إذا كان متاحًا
  if (deliveryLocation) {
    markers.push({
      id: 3,
      position: { lat: deliveryLocation.lat, lng: deliveryLocation.lng },
      title: 'عامل التوصيل',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    });
  }

  // معالج استجابة خدمة الاتجاهات
  const directionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (result !== null && status === 'OK') {
      setDirections(result);
      setDirectionsCallback(false); // إيقاف طلبات الاتجاهات المتكررة
    }
  };

  // إعادة طلب الاتجاهات عند تغيير موقع عامل التوصيل
  useEffect(() => {
    if (deliveryLocation) {
      setDirectionsCallback(true);
    }
  }, [deliveryLocation]);

  // عرض رسالة خطأ إذا فشل تحميل API
  if (loadError) {
    return <div className="p-4 text-red-600">فشل في تحميل خرائط Google</div>;
  }

  // عرض مؤشر التحميل أثناء تحميل API
  if (!isLoaded) {
    return <div className="p-4">جاري تحميل الخريطة...</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* طلب الاتجاهات */}
      {directionsCallback && (
        <DirectionsService
          options={{
            origin: deliveryLocation 
              ? new google.maps.LatLng(deliveryLocation.lat, deliveryLocation.lng)
              : new google.maps.LatLng(origin.lat, origin.lng),
            destination: new google.maps.LatLng(destination.lat, destination.lng),
            travelMode: google.maps.TravelMode.DRIVING,
          }}
          callback={directionsCallback}
        />
      )}

      {/* عرض الخريطة مع العلامات والاتجاهات */}
      <GoogleMapsComponent
        apiKey={apiKey}
        markers={markers}
        directions={directions}
      />

      {/* مفتاح الخريطة */}
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-md text-sm">
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
          <span>المطعم</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
          <span>العميل</span>
        </div>
        {deliveryLocation && (
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>عامل التوصيل</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryTrackingMap;
