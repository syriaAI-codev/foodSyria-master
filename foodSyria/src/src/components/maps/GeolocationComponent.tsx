import React, { useState, useEffect } from 'react';

// واجهة خصائص مكون تحديد الموقع الجغرافي
interface GeolocationComponentProps {
  onLocationDetected: (position: { lat: number; lng: number }) => void;
  buttonText?: string;
  className?: string;
  autoDetect?: boolean;
}

// مكون تحديد الموقع الجغرافي
const GeolocationComponent: React.FC<GeolocationComponentProps> = ({
  onLocationDetected,
  buttonText = "تحديد موقعي الحالي",
  className = "",
  autoDetect = false
}) => {
  // حالة تحميل الموقع
  const [loading, setLoading] = useState<boolean>(false);
  // حالة خطأ تحديد الموقع
  const [error, setError] = useState<string | null>(null);
  // حالة نجاح تحديد الموقع
  const [success, setSuccess] = useState<boolean>(false);

  // وظيفة تحديد الموقع الجغرافي
  const detectLocation = () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // التحقق من دعم المتصفح لخدمة تحديد الموقع
    if (!navigator.geolocation) {
      setError("متصفحك لا يدعم خدمة تحديد الموقع الجغرافي");
      setLoading(false);
      return;
    }

    // طلب الموقع الحالي
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationDetected({ lat: latitude, lng: longitude });
        setSuccess(true);
        setLoading(false);
      },
      (error) => {
        let errorMessage = "حدث خطأ أثناء تحديد موقعك";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "تم رفض طلب تحديد الموقع. يرجى السماح للتطبيق بالوصول إلى موقعك";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متاحة حاليًا";
            break;
          case error.TIMEOUT:
            errorMessage = "انتهت مهلة طلب تحديد الموقع";
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // تحديد الموقع تلقائيًا عند تحميل المكون إذا كان autoDetect صحيحًا
  useEffect(() => {
    if (autoDetect) {
      detectLocation();
    }
  }, [autoDetect]);

  return (
    <div className={`${className}`}>
      <button
        type="button"
        onClick={detectLocation}
        disabled={loading}
        className={`flex items-center justify-center px-4 py-2 rounded-md ${
          loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white'
        } transition-colors duration-200`}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري تحديد الموقع...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {buttonText}
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-2 text-green-600 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          تم تحديد موقعك بنجاح
        </div>
      )}
    </div>
  );
};

export default GeolocationComponent;
