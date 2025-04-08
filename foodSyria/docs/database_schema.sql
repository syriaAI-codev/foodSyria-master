-- مخطط قاعدة البيانات لتطبيق توصيل الطعام

-- إنشاء أنواع التعداد (ENUM)
CREATE TYPE user_role AS ENUM ('admin', 'customer', 'restaurant', 'delivery');
CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'preparing', 'ready_for_pickup', 'on_delivery', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE delivery_status AS ENUM ('assigned', 'picked_up', 'delivered', 'failed_delivery');

-- إنشاء جدول المستخدمين
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- إنشاء جدول المطاعم
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    phone TEXT NOT NULL,
    location_address TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- إنشاء جدول عناصر القائمة
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    available BOOLEAN NOT NULL DEFAULT true
);

-- إنشاء جدول الطلبات
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
    delivery_address TEXT NOT NULL,
    delivery_lat FLOAT NOT NULL,
    delivery_lng FLOAT NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
    payment_method TEXT NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- إنشاء جدول عناصر الطلب
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_order NUMERIC(10, 2) NOT NULL
);

-- إنشاء جدول عمال التوصيل
CREATE TABLE delivery_persons (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    is_available BOOLEAN NOT NULL DEFAULT true,
    current_lat FLOAT,
    current_lng FLOAT
);

-- إنشاء جدول عمليات التوصيل
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    delivery_person_id UUID REFERENCES delivery_persons(user_id) ON DELETE SET NULL,
    status delivery_status NOT NULL DEFAULT 'assigned',
    picked_up_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ
);

-- إنشاء سياسات أمان الصفوف (Row Level Security)

-- تفعيل RLS على جميع الجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- سياسات جدول المستخدمين
-- المستخدمون يمكنهم قراءة بياناتهم الخاصة فقط
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT USING (auth.uid() = id);

-- المستخدمون يمكنهم تعديل بياناتهم الخاصة فقط
CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (auth.uid() = id);

-- المديرون يمكنهم قراءة وتعديل جميع بيانات المستخدمين
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

CREATE POLICY "Admins can update all users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- سياسات جدول المطاعم
-- أصحاب المطاعم يمكنهم قراءة وتعديل مطاعمهم الخاصة فقط
CREATE POLICY "Restaurant owners can view their own restaurants" ON restaurants
    FOR SELECT USING (
        owner_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'customer'
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'delivery'
        )
    );

CREATE POLICY "Restaurant owners can update their own restaurants" ON restaurants
    FOR UPDATE USING (
        owner_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- سياسات جدول عناصر القائمة
-- أصحاب المطاعم يمكنهم قراءة وتعديل عناصر القائمة الخاصة بمطاعمهم فقط
CREATE POLICY "Restaurant owners can view their own menu items" ON menu_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = menu_items.restaurant_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'customer'
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'delivery'
        )
    );

CREATE POLICY "Restaurant owners can update their own menu items" ON menu_items
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = menu_items.restaurant_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

CREATE POLICY "Restaurant owners can insert menu items" ON menu_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = menu_items.restaurant_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

CREATE POLICY "Restaurant owners can delete their own menu items" ON menu_items
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = menu_items.restaurant_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- سياسات جدول الطلبات
-- العملاء يمكنهم قراءة طلباتهم الخاصة فقط
CREATE POLICY "Customers can view their own orders" ON orders
    FOR SELECT USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = orders.restaurant_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM deliveries
            JOIN delivery_persons ON deliveries.delivery_person_id = delivery_persons.user_id
            WHERE deliveries.order_id = orders.id
            AND delivery_persons.user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- العملاء يمكنهم إنشاء طلبات جديدة
CREATE POLICY "Customers can create orders" ON orders
    FOR INSERT WITH CHECK (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- أصحاب المطاعم يمكنهم تحديث حالة الطلبات الخاصة بمطاعمهم فقط
CREATE POLICY "Restaurant owners can update their restaurant orders" ON orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM restaurants
            WHERE restaurants.id = orders.restaurant_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM deliveries
            JOIN delivery_persons ON deliveries.delivery_person_id = delivery_persons.user_id
            WHERE deliveries.order_id = orders.id
            AND delivery_persons.user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- سياسات جدول عناصر الطلب
-- العملاء يمكنهم قراءة عناصر طلباتهم الخاصة فقط
CREATE POLICY "Customers can view their own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.customer_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM orders
            JOIN restaurants ON orders.restaurant_id = restaurants.id
            WHERE orders.id = order_items.order_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM orders
            JOIN deliveries ON orders.id = deliveries.order_id
            JOIN delivery_persons ON deliveries.delivery_person_id = delivery_persons.user_id
            WHERE orders.id = order_items.order_id
            AND delivery_persons.user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- العملاء يمكنهم إنشاء عناصر طلب جديدة
CREATE POLICY "Customers can create order items" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.customer_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- سياسات جدول عمال التوصيل
-- عمال التوصيل يمكنهم قراءة وتحديث بياناتهم الخاصة فقط
CREATE POLICY "Delivery persons can view their own data" ON delivery_persons
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'restaurant'
        )
    );

CREATE POLICY "Delivery persons can update their own data" ON delivery_persons
    FOR UPDATE USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- سياسات جدول عمليات التوصيل
-- عمال التوصيل يمكنهم قراءة وتحديث عمليات التوصيل المسندة إليهم فقط
CREATE POLICY "Delivery persons can view their assigned deliveries" ON deliveries
    FOR SELECT USING (
        delivery_person_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = deliveries.order_id
            AND orders.customer_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM orders
            JOIN restaurants ON orders.restaurant_id = restaurants.id
            WHERE orders.id = deliveries.order_id
            AND restaurants.owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

CREATE POLICY "Delivery persons can update their assigned deliveries" ON deliveries
    FOR UPDATE USING (
        delivery_person_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- المديرون يمكنهم إنشاء عمليات توصيل جديدة
CREATE POLICY "Admins can create deliveries" ON deliveries
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );
