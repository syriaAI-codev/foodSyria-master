import React, { useState } from 'react';
import GoogleMapsComponent from './GoogleMapsComponent';
import PlacesAutocomplete from './PlacesAutocomplete';
import GeolocationComponent from './GeolocationComponent';

// واجهة خصائص مكون اختيار الموقع
interface LocationPickerProps {
  apiKey: string;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number; address: string };
  className?: string;
}

// مكون اختيار الموقع
const LocationPicker: React.FC<LocationPickerProps> = ({
  apiKey,
  onLocationSelect,
  initialLocation,
  className = "",
}) => {
  // حالة الموقع المحدد
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(initialLocation || null);

  // حالة العلامة على الخريطة
  const [marker, setMarker] = useState<{
    id: number;
    position: { lat: number; lng: number };
    title: string;
  } | null>(
    initialLocation
      ? {
          id: 1,
          position: { lat: initialLocation.lat, lng: initialLocation.lng },
          title: initialLocation.address,
        }
      : null
  );

  // معالج اختيار المكان من الإكمال التلقائي
  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || '';

      setSelectedLocation({ lat, lng, address });
      setMarker({
        id: 1,
        position: { lat, lng },
        title: address,
      });

      onLocationSelect({ lat, lng, address });
    }
  };

  // معالج تحديد الموقع الجغرافي
  const handleLocationDetected = (position: { lat: number; lng: number }) => {
    // استخدام Geocoding API لتحويل الإحداثيات إلى عنوان
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: position.lat, lng: position.lng } },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const address = results[0].formatted_address || '';
          
          setSelectedLocation({ ...position, address });
          setMarker({
            id: 1,
            position: position,
            title: address,
          });

          onLocationSelect({ ...position, address });
        }
      }
    );
  };

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          العنوان
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow">
            <PlacesAutocomplete
              apiKey={apiKey}
              onPlaceSelect={handlePlaceSelect}
              placeholder="ابحث عن عنوان أو مكان"
              defaultValue={initialLocation?.address || ''}
            />
          </div>
          <GeolocationComponent
            onLocationDetected={handleLocationDetected}
            buttonText="موقعي الحالي"
            className="flex-shrink-0"
          />
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-300">
        <GoogleMapsComponent
          apiKey={apiKey}
          markers={marker ? [marker] : []}
          center={
            selectedLocation
              ? { lat: selectedLocation.lat, lng: selectedLocation.lng }
              : undefined
          }
        />
      </div>

      {selectedLocation && (
        <div className="mt-2 text-sm text-gray-600">
          <p>
            <strong>العنوان المحدد:</strong> {selectedLocation.address}
          </p>
          <p>
            <strong>الإحداثيات:</strong> {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
