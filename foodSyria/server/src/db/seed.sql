-- بيانات الاختبار لتطبيق توصيل الطعام فود سوريا

-- حذف البيانات الموجودة (إذا وجدت)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM menu_items;
DELETE FROM menu_categories;
DELETE FROM restaurant_categories;
DELETE FROM restaurant_hours;
DELETE FROM restaurants;
DELETE FROM delivery_drivers;
DELETE FROM customers;
DELETE FROM users;

-- إنشاء المستخدمين
INSERT INTO users (id, email, password_hash, phone, role, status, created_at, updated_at)
VALUES
  -- المدير
  ('1', 'moaz1993abdulrahman@gmail.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 123456', 'admin', 'active', NOW(), NOW()),
  
  -- العملاء
  ('2', 'mohammad@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 111222', 'customer', 'active', NOW(), NOW()),
  ('3', 'ahmad@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 222333', 'customer', 'active', NOW(), NOW()),
  ('4', 'ali@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 333444', 'customer', 'active', NOW(), NOW()),
  
  -- المطاعم
  ('5', 'alsham@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 11 1234567', 'restaurant', 'active', NOW(), NOW()),
  ('6', 'damascus@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 11 2345678', 'restaurant', 'active', NOW(), NOW()),
  ('7', 'aleppo@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 11 3456789', 'restaurant', 'active', NOW(), NOW()),
  
  -- السائقين
  ('8', 'rami@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 444555', 'driver', 'active', NOW(), NOW()),
  ('9', 'samer@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 555666', 'driver', 'active', NOW(), NOW()),
  ('10', 'khaled@example.com', '$2a$10$XQhg1AQvmEJZxqE0xT/ZIeYoQl4kGMmLxk9KO.1eLrGHxPe0xCmPy', '+963 955 666777', 'driver', 'active', NOW(), NOW());

-- إنشاء بيانات المدير
INSERT INTO admins (id, user_id, name, created_at, updated_at)
VALUES ('1', '1', 'معاذ عبد الرحمن', NOW(), NOW());

-- إنشاء بيانات العملاء
INSERT INTO customers (id, user_id, name, address, location, created_at, updated_at)
VALUES
  ('1', '2', 'محمد أحمد', 'دمشق، شارع الحمراء، بناء رقم 7، طابق 3', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), NOW(), NOW()),
  ('2', '3', 'أحمد محمود', 'دمشق، شارع الميدان، بناء رقم 12، طابق 1', ST_GeomFromText('POINT(33.4950 36.3020)', 4326), NOW(), NOW()),
  ('3', '4', 'علي حسن', 'دمشق، شارع العابد، بناء رقم 5، طابق 2', ST_GeomFromText('POINT(33.5120 36.2950)', 4326), NOW(), NOW());

-- إنشاء بيانات المطاعم
INSERT INTO restaurants (id, user_id, name, description, address, location, logo_url, cover_image_url, min_order_amount, delivery_fee, estimated_delivery_time, rating, reviews_count, created_at, updated_at)
VALUES
  ('1', '5', 'مطعم الشام', 'أشهى المأكولات الشامية التقليدية', 'دمشق، شارع الحمراء، بناء رقم 7', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), 'https://via.placeholder.com/150', 'https://via.placeholder.com/800x400', 15000, 5000, 45, 4.8, 120, NOW(), NOW()),
  ('2', '6', 'مطعم دمشق', 'أفضل الحلويات والفطور الدمشقي', 'دمشق، شارع بغداد، بناء رقم 12', ST_GeomFromText('POINT(33.5100 36.2900)', 4326), 'https://via.placeholder.com/150', 'https://via.placeholder.com/800x400', 20000, 6000, 50, 4.6, 95, NOW(), NOW()),
  ('3', '7', 'مطعم حلب', 'أشهر المأكولات الحلبية الأصيلة', 'دمشق، شارع الثورة، بناء رقم 5', ST_GeomFromText('POINT(33.5120 36.2950)', 4326), 'https://via.placeholder.com/150', 'https://via.placeholder.com/800x400', 18000, 5500, 40, 4.5, 85, NOW(), NOW());

-- إنشاء بيانات السائقين
INSERT INTO delivery_drivers (id, user_id, name, vehicle_type, license_plate, is_available, current_location, created_at, updated_at)
VALUES
  ('1', '8', 'رامي علي', 'دراجة نارية', 'د ن 12345', TRUE, ST_GeomFromText('POINT(33.5180 36.2840)', 4326), NOW(), NOW()),
  ('2', '9', 'سامر محمد', 'دراجة نارية', 'د ن 23456', TRUE, ST_GeomFromText('POINT(33.5100 36.2900)', 4326), NOW(), NOW()),
  ('3', '10', 'خالد أحمد', 'دراجة نارية', 'د ن 34567', FALSE, ST_GeomFromText('POINT(33.5120 36.2950)', 4326), NOW(), NOW());

-- إنشاء فئات المطاعم
INSERT INTO categories (id, name, created_at, updated_at)
VALUES
  ('1', 'شاورما', NOW(), NOW()),
  ('2', 'مشاوي', NOW(), NOW()),
  ('3', 'عربي', NOW(), NOW()),
  ('4', 'فطور', NOW(), NOW()),
  ('5', 'حلويات', NOW(), NOW()),
  ('6', 'كبة', NOW(), NOW()),
  ('7', 'مقبلات', NOW(), NOW()),
  ('8', 'أكلات منزلية', NOW(), NOW()),
  ('9', 'هندي', NOW(), NOW()),
  ('10', 'آسيوي', NOW(), NOW()),
  ('11', 'بيتزا', NOW(), NOW()),
  ('12', 'باستا', NOW(), NOW()),
  ('13', 'إيطالي', NOW(), NOW()),
  ('14', 'سمك', NOW(), NOW()),
  ('15', 'مأكولات بحرية', NOW(), NOW()),
  ('16', 'فلافل', NOW(), NOW()),
  ('17', 'سناك', NOW(), NOW());

-- ربط المطاعم بالفئات
INSERT INTO restaurant_categories (restaurant_id, category_id, created_at, updated_at)
VALUES
  -- مطعم الشام
  ('1', '1', NOW(), NOW()),
  ('1', '2', NOW(), NOW()),
  ('1', '3', NOW(), NOW()),
  
  -- مطعم دمشق
  ('2', '4', NOW(), NOW()),
  ('2', '5', NOW(), NOW()),
  ('2', '3', NOW(), NOW()),
  
  -- مطعم حلب
  ('3', '6', NOW(), NOW()),
  ('3', '7', NOW(), NOW()),
  ('3', '3', NOW(), NOW());

-- إنشاء ساعات عمل المطاعم
INSERT INTO restaurant_hours (id, restaurant_id, day_of_week, opening_time, closing_time, is_closed, created_at, updated_at)
VALUES
  -- مطعم الشام
  ('1', '1', 0, '09:00:00', '23:00:00', FALSE, NOW(), NOW()), -- الأحد
  ('2', '1', 1, '09:00:00', '23:00:00', FALSE, NOW(), NOW()), -- الإثنين
  ('3', '1', 2, '09:00:00', '23:00:00', FALSE, NOW(), NOW()), -- الثلاثاء
  ('4', '1', 3, '09:00:00', '23:00:00', FALSE, NOW(), NOW()), -- الأربعاء
  ('5', '1', 4, '09:00:00', '23:00:00', FALSE, NOW(), NOW()), -- الخميس
  ('6', '1', 5, '09:00:00', '00:00:00', FALSE, NOW(), NOW()), -- الجمعة
  ('7', '1', 6, '09:00:00', '00:00:00', FALSE, NOW(), NOW()), -- السبت
  
  -- مطعم دمشق
  ('8', '2', 0, '08:00:00', '22:00:00', FALSE, NOW(), NOW()),  -- الأحد
  ('9', '2', 1, '08:00:00', '22:00:00', FALSE, NOW(), NOW()),  -- الإثنين
  ('10', '2', 2, '08:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الثلاثاء
  ('11', '2', 3, '08:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الأربعاء
  ('12', '2', 4, '08:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الخميس
  ('13', '2', 5, '08:00:00', '23:00:00', FALSE, NOW(), NOW()), -- الجمعة
  ('14', '2', 6, '08:00:00', '23:00:00', FALSE, NOW(), NOW()), -- السبت
  
  -- مطعم حلب
  ('15', '3', 0, '10:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الأحد
  ('16', '3', 1, '10:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الإثنين
  ('17', '3', 2, '10:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الثلاثاء
  ('18', '3', 3, '10:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الأربعاء
  ('19', '3', 4, '10:00:00', '22:00:00', FALSE, NOW(), NOW()), -- الخميس
  ('20', '3', 5, '10:00:00', '23:30:00', FALSE, NOW(), NOW()), -- الجمعة
  ('21', '3', 6, '10:00:00', '23:30:00', FALSE, NOW(), NOW()); -- السبت

-- إنشاء فئات القائمة
INSERT INTO menu_categories (id, restaurant_id, name, description, created_at, updated_at)
VALUES
  -- مطعم الشام
  ('1', '1', 'شاورما', 'تشكيلة متنوعة من الشاورما', NOW(), NOW()),
  ('2', '1', 'مشاوي', 'أشهى أنواع المشاوي', NOW(), NOW()),
  ('3', '1', 'سلطات', 'سلطات طازجة', NOW(), NOW()),
  ('4', '1', 'مشروبات', 'مشروبات منعشة', NOW(), NOW()),
  
  -- مطعم دمشق
  ('5', '2', 'فطور', 'أشهى أطباق الفطور الدمشقي', NOW(), NOW()),
  ('6', '2', 'حلويات', 'أشهر الحلويات الدمشقية', NOW(), NOW()),
  ('7', '2', 'مشروبات ساخنة', 'مشروبات ساخنة مميزة', NOW(), NOW()),
  ('8', '2', 'عصائر طبيعية', 'عصائر طازجة', NOW(), NOW()),
  
  -- مطعم حلب
  ('9', '3', 'كبة', 'أنواع الكبة الحلبية', NOW(), NOW()),
  ('10', '3', 'مقبلات', 'مقبلات شهية', NOW(), NOW()),
  ('11', '3', 'أطباق رئيسية', 'أطباق رئيسية مميزة', NOW(), NOW()),
  ('12', '3', 'حلويات', 'حلويات حلبية', NOW(), NOW());

-- إنشاء عناصر القائمة
INSERT INTO menu_items (id, restaurant_id, menu_category_id, name, description, price, image_url, is_available, is_vegetarian, is_featured, created_at, updated_at)
VALUES
  -- مطعم الشام - شاورما
  ('1', '1', '1', 'شاورما دجاج', 'شاورما دجاج مع صلصة الثوم والمخللات', 15000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  ('2', '1', '1', 'شاورما لحم', 'شاورما لحم مع صلصة الطحينة والمخللات', 18000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  ('3', '1', '1', 'شاورما مشكل', 'شاورما مشكل (لحم ودجاج) مع الصلصات', 20000, 'https://via.placeholder.com/300', TRUE, FALSE, FALSE, NOW(), NOW()),
  
  -- مطعم الشام - مشاوي
  ('4', '1', '2', 'كباب حلبي', 'كباب لحم مفروم مع بهارات حلبية', 22000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  ('5', '1', '2', 'شيش طاووق', 'قطع دجاج متبلة مشوية', 20000, 'https://via.placeholder.com/300', TRUE, FALSE, FALSE, NOW(), NOW()),
  ('6', '1', '2', 'مشاوي مشكلة', 'تشكيلة من المشاوي (كباب، طاووق، كفتة)', 35000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  
  -- مطعم الشام - سلطات
  ('7', '1', '3', 'سلطة خضراء', 'خضار طازجة مع صلصة الليمون', 8000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('8', '1', '3', 'تبولة', 'تبولة طازجة مع البرغل والبقدونس', 10000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('9', '1', '3', 'فتوش', 'سلطة فتوش مع الخبز المحمص', 12000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  
  -- مطعم الشام - مشروبات
  ('10', '1', '4', 'عصير ليمون', 'عصير ليمون طازج', 5000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('11', '1', '4', 'كولا', 'كولا باردة', 3000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('12', '1', '4', 'ماء معدني', 'ماء معدني', 2000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  
  -- مطعم دمشق - فطور
  ('13', '2', '5', 'فول مدمس', 'فول مدمس مع زيت الزيتون والليمون', 8000, 'https://via.placeholder.com/300', TRUE, TRUE, TRUE, NOW(), NOW()),
  ('14', '2', '5', 'حمص', 'حمص مع زيت الزيتون والصنوبر', 10000, 'https://via.placeholder.com/300', TRUE, TRUE, TRUE, NOW(), NOW()),
  ('15', '2', '5', 'فطور مشكل', 'تشكيلة من الفطور (فول، حمص، لبنة، زيتون)', 25000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  
  -- مطعم دمشق - حلويات
  ('16', '2', '6', 'كنافة نابلسية', 'كنافة نابلسية مع القطر', 12000, 'https://via.placeholder.com/300', TRUE, TRUE, TRUE, NOW(), NOW()),
  ('17', '2', '6', 'بقلاوة', 'بقلاوة مشكلة', 15000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('18', '2', '6', 'هريسة', 'هريسة مع القطر', 10000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  
  -- مطعم دمشق - مشروبات ساخنة
  ('19', '2', '7', 'شاي', 'شاي عربي', 3000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('20', '2', '7', 'قهوة عربية', 'قهوة عربية مع الهيل', 4000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('21', '2', '7', 'يانسون', 'مشروب اليانسون الساخن', 3000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  
  -- مطعم دمشق - عصائر طبيعية
  ('22', '2', '8', 'عصير برتقال', 'عصير برتقال طازج', 7000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('23', '2', '8', 'عصير فراولة', 'عصير فراولة طازج', 8000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('24', '2', '8', 'عصير مانجو', 'عصير مانجو طازج', 9000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  
  -- مطعم حلب - كبة
  ('25', '3', '9', 'كبة مقلية', 'كبة مقلية حلبية', 12000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  ('26', '3', '9', 'كبة نية', 'كبة نية مع البرغل الناعم', 15000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  ('27', '3', '9', 'كبة بالصينية', 'كبة بالصينية مع الصنوبر', 20000, 'https://via.placeholder.com/300', TRUE, FALSE, FALSE, NOW(), NOW()),
  
  -- مطعم حلب - مقبلات
  ('28', '3', '10', 'متبل', 'متبل باذنجان مع الطحينة', 8000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('29', '3', '10', 'محمرة', 'محمرة حلبية حارة', 10000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('30', '3', '10', 'لبنة', 'لبنة مع زيت الزيتون', 7000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  
  -- مطعم حلب - أطباق رئيسية
  ('31', '3', '11', 'يبرق', 'ورق عنب محشي', 18000, 'https://via.placeholder.com/300', TRUE, TRUE, TRUE, NOW(), NOW()),
  ('32', '3', '11', 'محاشي مشكلة', 'محاشي مشكلة (كوسا، باذنجان، فليفلة)', 22000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('33', '3', '11', 'فريكة بالدجاج', 'فريكة مع الدجاج والمكسرات', 25000, 'https://via.placeholder.com/300', TRUE, FALSE, TRUE, NOW(), NOW()),
  
  -- مطعم حلب - حلويات
  ('34', '3', '12', 'حلاوة الجبن', 'حلاوة الجبن الحلبية مع القشطة', 12000, 'https://via.placeholder.com/300', TRUE, TRUE, TRUE, NOW(), NOW()),
  ('35', '3', '12', 'مبرومة', 'مبرومة حلبية مع الفستق', 15000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW()),
  ('36', '3', '12', 'عيش السرايا', 'عيش السرايا مع القشطة', 10000, 'https://via.placeholder.com/300', TRUE, TRUE, FALSE, NOW(), NOW());

-- إنشاء الطلبات
INSERT INTO orders (id, customer_id, restaurant_id, delivery_driver_id, status, total_amount, delivery_fee, payment_method, payment_status, delivery_address, delivery_location, estimated_delivery_time, actual_delivery_time, created_at, updated_at)
VALUES
  -- طلبات محمد أحمد
  ('1', '1', '1', '1', 'delivered', 43000, 5000, 'cash_on_delivery', 'paid', 'دمشق، شارع الحمراء، بناء رقم 7، طابق 3', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), '2025-04-05 19:30:00', '2025-04-05 19:25:00', '2025-04-05 18:45:00', '2025-04-05 19:25:00'),
  ('2', '1', '2', NULL, 'pending', 35000, 6000, 'cash_on_delivery', 'pending', 'دمشق، شارع الحمراء، بناء رقم 7، طابق 3', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), '2025-04-06 19:00:00', NULL, '2025-04-06 18:15:00', '2025-04-06 18:15:00'),
  
  -- طلبات أحمد محمود
  ('3', '2', '3', '2', 'on_the_way', 50000, 5500, 'cash_on_delivery', 'pending', 'دمشق، شارع الميدان، بناء رقم 12، طابق 1', ST_GeomFromText('POINT(33.4950 36.3020)', 4326), '2025-04-06 19:15:00', NULL, '2025-04-06 18:30:00', '2025-04-06 18:45:00'),
  
  -- طلبات علي حسن
  ('4', '3', '1', NULL, 'preparing', 60000, 5000, 'cash_on_delivery', 'pending', 'دمشق، شارع العابد، بناء رقم 5، طابق 2', ST_GeomFromText('POINT(33.5120 36.2950)', 4326), '2025-04-06 19:30:00', NULL, '2025-04-06 18:45:00', '2025-04-06 18:50:00');

-- إنشاء عناصر الطلبات
INSERT INTO order_items (id, order_id, menu_item_id, quantity, unit_price, total_price, special_instructions, created_at, updated_at)
VALUES
  -- طلب محمد أحمد #1
  ('1', '1', '1', 1, 15000, 15000, NULL, '2025-04-05 18:45:00', '2025-04-05 18:45:00'),
  ('2', '1', '4', 1, 22000, 22000, 'حار قليلاً', '2025-04-05 18:45:00', '2025-04-05 18:45:00'),
  ('3', '1', '10', 1, 5000, 5000, NULL, '2025-04-05 18:45:00', '2025-04-05 18:45:00'),
  
  -- طلب محمد أحمد #2
  ('4', '2', '13', 1, 8000, 8000, NULL, '2025-04-06 18:15:00', '2025-04-06 18:15:00'),
  ('5', '2', '16', 2, 12000, 24000, NULL, '2025-04-06 18:15:00', '2025-04-06 18:15:00'),
  ('6', '2', '19', 1, 3000, 3000, NULL, '2025-04-06 18:15:00', '2025-04-06 18:15:00'),
  
  -- طلب أحمد محمود #3
  ('7', '3', '25', 2, 12000, 24000, NULL, '2025-04-06 18:30:00', '2025-04-06 18:30:00'),
  ('8', '3', '28', 1, 8000, 8000, NULL, '2025-04-06 18:30:00', '2025-04-06 18:30:00'),
  ('9', '3', '34', 1, 12000, 12000, 'إضافة فستق', '2025-04-06 18:30:00', '2025-04-06 18:30:00'),
  
  -- طلب علي حسن #4
  ('10', '4', '2', 2, 18000, 36000, NULL, '2025-04-06 18:45:00', '2025-04-06 18:45:00'),
  ('11', '4', '6', 1, 35000, 35000, 'بدون بصل', '2025-04-06 18:45:00', '2025-04-06 18:45:00'),
  ('12', '4', '11', 3, 3000, 9000, NULL, '2025-04-06 18:45:00', '2025-04-06 18:45:00');

-- إنشاء التقييمات والمراجعات
INSERT INTO reviews (id, customer_id, restaurant_id, order_id, rating, comment, created_at, updated_at)
VALUES
  ('1', '1', '1', '1', 5, 'طعام لذيذ وتوصيل سريع', '2025-04-05 20:00:00', '2025-04-05 20:00:00'),
  ('2', '2', '3', NULL, 4, 'الكبة رائعة جداً', '2025-04-04 21:30:00', '2025-04-04 21:30:00'),
  ('3', '3', '2', NULL, 5, 'أفضل حلويات في دمشق', '2025-04-03 19:45:00', '2025-04-03 19:45:00');

-- إنشاء سجل تتبع التوصيل
INSERT INTO delivery_tracking (id, order_id, delivery_driver_id, status, location, created_at, updated_at)
VALUES
  -- طلب محمد أحمد #1
  ('1', '1', '1', 'assigned', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), '2025-04-05 19:00:00', '2025-04-05 19:00:00'),
  ('2', '1', '1', 'picked_up', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), '2025-04-05 19:10:00', '2025-04-05 19:10:00'),
  ('3', '1', '1', 'on_the_way', ST_GeomFromText('POINT(33.5170 36.2830)', 4326), '2025-04-05 19:15:00', '2025-04-05 19:15:00'),
  ('4', '1', '1', 'delivered', ST_GeomFromText('POINT(33.5180 36.2840)', 4326), '2025-04-05 19:25:00', '2025-04-05 19:25:00'),
  
  -- طلب أحمد محمود #3
  ('5', '3', '2', 'assigned', ST_GeomFromText('POINT(33.5100 36.2900)', 4326), '2025-04-06 18:40:00', '2025-04-06 18:40:00'),
  ('6', '3', '2', 'picked_up', ST_GeomFromText('POINT(33.5120 36.2950)', 4326), '2025-04-06 18:45:00', '2025-04-06 18:45:00'),
  ('7', '3', '2', 'on_the_way', ST_GeomFromText('POINT(33.5000 36.3000)', 4326), '2025-04-06 18:50:00', '2025-04-06 18:50:00');

-- إنشاء الإشعارات
INSERT INTO notifications (id, user_id, type, title, message, is_read, created_at, updated_at)
VALUES
  -- إشعارات محمد أحمد
  ('1', '2', 'order_status', 'تم استلام طلبك', 'تم استلام طلبك رقم #1 وجاري تحضيره', FALSE, '2025-04-05 18:45:00', '2025-04-05 18:45:00'),
  ('2', '2', 'order_status', 'طلبك جاهز للتوصيل', 'طلبك رقم #1 جاهز وفي طريقه إليك', FALSE, '2025-04-05 19:10:00', '2025-04-05 19:10:00'),
  ('3', '2', 'order_status', 'تم توصيل طلبك', 'تم توصيل طلبك رقم #1 بنجاح', FALSE, '2025-04-05 19:25:00', '2025-04-05 19:25:00'),
  ('4', '2', 'order_status', 'تم استلام طلبك', 'تم استلام طلبك رقم #2 وجاري تحضيره', FALSE, '2025-04-06 18:15:00', '2025-04-06 18:15:00'),
  
  -- إشعارات أحمد محمود
  ('5', '3', 'order_status', 'تم استلام طلبك', 'تم استلام طلبك رقم #3 وجاري تحضيره', FALSE, '2025-04-06 18:30:00', '2025-04-06 18:30:00'),
  ('6', '3', 'order_status', 'طلبك جاهز للتوصيل', 'طلبك رقم #3 جاهز وفي طريقه إليك', FALSE, '2025-04-06 18:45:00', '2025-04-06 18:45:00'),
  
  -- إشعارات علي حسن
  ('7', '4', 'order_status', 'تم استلام طلبك', 'تم استلام طلبك رقم #4 وجاري تحضيره', FALSE, '2025-04-06 18:45:00', '2025-04-06 18:45:00'),
  
  -- إشعارات المطاعم
  ('8', '5', 'new_order', 'طلب جديد', 'لديك طلب جديد رقم #1', FALSE, '2025-04-05 18:45:00', '2025-04-05 18:45:00'),
  ('9', '5', 'new_order', 'طلب جديد', 'لديك طلب جديد رقم #4', FALSE, '2025-04-06 18:45:00', '2025-04-06 18:45:00'),
  ('10', '6', 'new_order', 'طلب جديد', 'لديك طلب جديد رقم #2', FALSE, '2025-04-06 18:15:00', '2025-04-06 18:15:00'),
  ('11', '7', 'new_order', 'طلب جديد', 'لديك طلب جديد رقم #3', FALSE, '2025-04-06 18:30:00', '2025-04-06 18:30:00'),
  
  -- إشعارات السائقين
  ('12', '8', 'new_delivery', 'توصيل جديد', 'تم تعيينك لتوصيل الطلب رقم #1', FALSE, '2025-04-05 19:00:00', '2025-04-05 19:00:00'),
  ('13', '9', 'new_delivery', 'توصيل جديد', 'تم تعيينك لتوصيل الطلب رقم #3', FALSE, '2025-04-06 18:40:00', '2025-04-06 18:40:00');

-- إنشاء إعدادات النظام
INSERT INTO system_settings (id, key, value, created_at, updated_at)
VALUES
  ('1', 'site_name', 'فود سوريا', NOW(), NOW()),
  ('2', 'site_description', 'منصة توصيل الطعام الأولى في سوريا', NOW(), NOW()),
  ('3', 'contact_email', 'support@foodsyria.com', NOW(), NOW()),
  ('4', 'contact_phone', '+963 11 1234567', NOW(), NOW()),
  ('5', 'default_currency', 'SYP', NOW(), NOW()),
  ('6', 'default_language', 'ar', NOW(), NOW()),
  ('7', 'base_delivery_fee', '5000', NOW(), NOW()),
  ('8', 'min_order_amount', '15000', NOW(), NOW()),
  ('9', 'max_delivery_distance', '10', NOW(), NOW()),
  ('10', 'estimated_delivery_time', '45', NOW(), NOW());
