import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

// تكوين الخريطة
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

// مركز الخريطة الافتراضي (دمشق، سوريا)
const center = {
  lat: 33.5138,
  lng: 36.2765,
};

// خيارات الخريطة
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: true,
};

// مكون الخريطة الأساسي
const GoogleMapsComponent: React.FC<{
  apiKey: string;
  markers?: Array<{
    id: number;
    position: { lat: number; lng: number };
    title: string;
    icon?: string;
  }>;
  directions?: google.maps.DirectionsResult | null;
  onMarkerClick?: (markerId: number) => void;
}> = ({ apiKey, markers = [], directions = null, onMarkerClick }) => {
  // تحميل API الخرائط
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    language: 'ar',
    region: 'SY',
  });

  // مرجع الخريطة
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  // حالة نافذة المعلومات
  const [selectedMarker, setSelectedMarker] = React.useState<number | null>(null);

  // تحميل الخريطة
  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  // إلغاء تحميل الخريطة
  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  // التعامل مع النقر على العلامة
  const handleMarkerClick = (markerId: number) => {
    setSelectedMarker(markerId);
    if (onMarkerClick) {
      onMarkerClick(markerId);
    }
  };

  // عرض رسالة خطأ إذا فشل تحميل API
  if (loadError) {
    return <div className="p-4 text-red-600">فشل في تحميل خرائط Google</div>;
  }

  // عرض مؤشر التحميل أثناء تحميل API
  if (!isLoaded) {
    return <div className="p-4">جاري تحميل الخريطة...</div>;
  }

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        options={options}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* عرض العلامات */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            icon={marker.icon}
            onClick={() => handleMarkerClick(marker.id)}
          />
        ))}

        {/* عرض نافذة المعلومات للعلامة المحددة */}
        {selectedMarker !== null && (
          <InfoWindow
            position={markers.find(m => m.id === selectedMarker)?.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-bold">{markers.find(m => m.id === selectedMarker)?.title}</h3>
            </div>
          </InfoWindow>
        )}

        {/* عرض الاتجاهات إذا كانت متوفرة */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#5046e5',
                strokeWeight: 5,
                strokeOpacity: 0.7,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapsComponent;
