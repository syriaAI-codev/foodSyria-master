import React, { useState, useEffect, useRef } from 'react';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

// واجهة خصائص مكون الإكمال التلقائي للأماكن
interface PlacesAutocompleteProps {
  apiKey: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

// مكتبات Google Maps المطلوبة
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

// مكون الإكمال التلقائي للأماكن
const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  apiKey,
  onPlaceSelect,
  placeholder = "أدخل العنوان",
  className = "",
  defaultValue = ""
}) => {
  // تحميل API الخرائط مع مكتبة الأماكن
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
    language: 'ar',
    region: 'SY',
  });

  // مرجع لصندوق البحث
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  // قيمة حقل البحث
  const [searchValue, setSearchValue] = useState(defaultValue);

  // تحميل صندوق البحث
  const onLoad = (ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  };

  // إلغاء تحميل صندوق البحث
  const onUnmount = () => {
    searchBoxRef.current = null;
  };

  // الاستماع لتغييرات الأماكن
  useEffect(() => {
    if (searchBoxRef.current) {
      const searchBox = searchBoxRef.current;
      const placesChangedListener = searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places && places.length > 0) {
          onPlaceSelect(places[0]);
        }
      });

      return () => {
        // إزالة المستمع عند تفكيك المكون
        google.maps.event.removeListener(placesChangedListener);
      };
    }
  }, [searchBoxRef.current, onPlaceSelect]);

  // عرض رسالة خطأ إذا فشل تحميل API
  if (loadError) {
    return <div className="p-2 text-red-600 text-sm">فشل في تحميل خدمة البحث عن الأماكن</div>;
  }

  // عرض مؤشر التحميل أثناء تحميل API
  if (!isLoaded) {
    return <div className="p-2 text-gray-500 text-sm">جاري تحميل خدمة البحث...</div>;
  }

  return (
    <div className="w-full">
      <StandaloneSearchBox onLoad={onLoad} onUnmount={onUnmount}>
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default PlacesAutocomplete;
