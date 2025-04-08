import React, { useState, useEffect, createContext, useContext } from 'react';

// إنشاء سياق سلة التسوق
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
  restaurantName: string;
}

interface CartContextType {
  items: CartItem[];
  restaurantId: number | null;
  restaurantName: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// مزود سياق سلة التسوق
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  
  // استرجاع حالة السلة من التخزين المحلي عند التحميل
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('cartRestaurantId');
    const savedRestaurantName = localStorage.getItem('cartRestaurantName');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedRestaurantId) {
      setRestaurantId(JSON.parse(savedRestaurantId));
    }
    
    if (savedRestaurantName) {
      setRestaurantName(JSON.parse(savedRestaurantName));
    }
  }, []);
  
  // حفظ حالة السلة في التخزين المحلي عند التغيير
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    localStorage.setItem('cartRestaurantId', JSON.stringify(restaurantId));
    localStorage.setItem('cartRestaurantName', JSON.stringify(restaurantName));
  }, [items, restaurantId, restaurantName]);
  
  // إضافة عنصر إلى السلة
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    // التحقق مما إذا كان العنصر من نفس المطعم
    if (restaurantId !== null && restaurantId !== item.restaurantId) {
      if (!window.confirm('سيؤدي إضافة عناصر من مطعم آخر إلى مسح سلة التسوق الحالية. هل تريد المتابعة؟')) {
        return;
      }
      // مسح السلة وتعيين المطعم الجديد
      setItems([]);
      setRestaurantId(item.restaurantId);
      setRestaurantName(item.restaurantName);
    } else if (restaurantId === null) {
      // تعيين المطعم إذا كانت السلة فارغة
      setRestaurantId(item.restaurantId);
      setRestaurantName(item.restaurantName);
    }
    
    // التحقق مما إذا كان العنصر موجودًا بالفعل
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex !== -1) {
      // زيادة الكمية إذا كان العنصر موجودًا بالفعل
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      setItems(updatedItems);
    } else {
      // إضافة العنصر الجديد
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };
  
  // إزالة عنصر من السلة
  const removeItem = (itemId: number) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    
    // إعادة تعيين معلومات المطعم إذا أصبحت السلة فارغة
    if (updatedItems.length === 0) {
      setRestaurantId(null);
      setRestaurantName(null);
    }
  };
  
  // تحديث كمية عنصر
  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    setItems(updatedItems);
  };
  
  // مسح السلة
  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
  };
  
  // حساب إجمالي السلة
  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // حساب عدد العناصر في السلة
  const getItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        restaurantId,
        restaurantName,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// هوك استخدام سلة التسوق
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
