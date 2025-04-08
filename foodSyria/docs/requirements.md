Project Prompts -- Food Delivery App (Arabic -- Syria Target) 
-------------------------------------------------------------

📌 **Prompt 1: Project Setup & Environment Configuration (Full Stack)**

Create a fully responsive food delivery web app (RTL Arabic, Syria
locale) using:\
• Frontend: React.js + TailwindCSS + Framer Motion\
• Backend: Node.js + Express.js\
• Database: Supabase\
• Maps: Google Maps API\
Use the following environment variables (Store securely using **right
way** or .env if local, ensure .env is in .gitignore):

Supabase URL:

https://jxjpnmwydldorerjjfhe.supabase.co

Supabase Anon Key:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4anBubXd5ZGxkb3JlcmpqZmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTU0MjEsImV4cCI6MjA1OTMzMTQyMX0.jx0eS89r6eqf2TJPCiqw\_pj34uslPqRZHmVCdBtVZ-o

Google Maps API Key :
AIzaSyALNa25I6iVPdV6WwI-MdKQ2nQo68lx4C8Instructions:

• Create /src for frontend, /server for backend.\
• Install necessary packages (axios, supabase-js, react-router-dom,
tailwindcss, framer-motion, dotenv, express, cors, react-hook-form +
zod).\
• Load environment variables securely.\
• Implement **centralized error handling middleware** in the Express
backend.\
• Enable full RTL layout (dir=\"rtl\" attribute on \<html\> or \<body\>,
configure Tailwind for RTL).\
• Include Framer Motion for basic UI transitions/animations.\
• **Important:** Implement comprehensive error handling across all user
inputs (frontend/backend validation) and API interactions. Provide
clear, user-friendly feedback (in Arabic) for invalid/incomplete data
(e.g., phone format, missing fields, API failures).

📌 **Prompt 2: Supabase Database Schema with Relations & RLS**

Use Supabase dashboard or SQL migrations to create these tables with
clear foreign key relations and **detailed Row Level Security (RLS)**:

1.  users (Leverages Supabase Auth for core user data)

    -   id (UUID, PK - References auth.users.id)

    -   name (TEXT)

    -   phone (TEXT, unique, add validation constraints)

    -   role (ENUM: \'admin\', \'customer\', \'restaurant\',
        \'delivery\'), default \'customer\'

    -   address (TEXT, nullable) // Primary address

    -   created\_at (TIMESTAMPTZ, default now())

    -   *(Email/Password handled by Supabase Auth)*

2.  restaurants

    -   id (UUID, PK, default uuid\_generate\_v4())

    -   owner\_id (UUID, FK → users.id, ON DELETE CASCADE) // Links to
        the restaurant owner user

    -   name (TEXT, not null)

    -   description (TEXT)

    -   phone (TEXT, not null)

    -   location\_address (TEXT, not null)

    -   latitude (FLOAT, not null)

    -   longitude (FLOAT, not null)

    -   logo\_url (TEXT, nullable)

    -   created\_at (TIMESTAMPTZ, default now())

3.  menu\_items

    -   id (UUID, PK, default uuid\_generate\_v4())

    -   restaurant\_id (UUID, FK → restaurants.id, ON DELETE CASCADE)

    -   name (TEXT, not null)

    -   description (TEXT)

    -   price (NUMERIC(10, 2), not null, check \>= 0)

    -   image\_url (TEXT, nullable)

    -   available (BOOLEAN, default true)

4.  orders

    -   id (UUID, PK, default uuid\_generate\_v4())

    -   customer\_id (UUID, FK → users.id, ON DELETE SET NULL)

    -   restaurant\_id (UUID, FK → restaurants.id, ON DELETE SET NULL)

    -   delivery\_address (TEXT, not null)

    -   delivery\_lat (FLOAT, not null)

    -   delivery\_lng (FLOAT, not null)

    -   status (ENUM: \'pending\', \'accepted\', \'preparing\',
        \'ready\_for\_pickup\', \'on\_delivery\', \'delivered\',
        \'cancelled\'), default \'pending\'

    -   total\_price (NUMERIC(10, 2), not null, check \>= 0)

    -   payment\_method (TEXT) // e.g., \'cod\', \'online\'

    -   payment\_status (ENUM: \'pending\', \'paid\', \'failed\'),
        default \'pending\'

    -   created\_at (TIMESTAMPTZ, default now())

5.  order\_items

    -   id (UUID, PK, default uuid\_generate\_v4())

    -   order\_id (UUID, FK → orders.id, ON DELETE CASCADE)

    -   menu\_item\_id (UUID, FK → menu\_items.id, ON DELETE SET NULL)

    -   quantity (INT, not null, check \> 0)

    -   price\_at\_order (NUMERIC(10, 2), not null) // Store price when
        ordered

6.  delivery\_persons

    -   user\_id (UUID, PK, FK → users.id, ON DELETE CASCADE) // User
        *is* the delivery person

    -   is\_available (BOOLEAN, default true)

    -   current\_lat (FLOAT, nullable) // For real-time tracking

    -   current\_lng (FLOAT, nullable)

7.  deliveries (Assigns orders to delivery persons)

    -   id (UUID, PK, default uuid\_generate\_v4())

    -   order\_id (UUID, FK → orders.id, UNIQUE, ON DELETE CASCADE) //
        One delivery per order

    -   delivery\_person\_id (UUID, FK → delivery\_persons.user\_id, ON
        DELETE SET NULL)

    -   status (ENUM: \'assigned\', \'picked\_up\', \'delivered\',
        \'failed\_delivery\'), default \'assigned\'

    -   picked\_up\_at (TIMESTAMPTZ, nullable)

    -   delivered\_at (TIMESTAMPTZ, nullable)

**RLS & Database Integrity:**\
• Implement comprehensive Supabase Row Level Security (RLS) policies for
all tables. **Test RLS policies rigorously (See Prompt 10 Testing).**\
• Ensure operations involving multiple tables (e.g., creating orders and
order\_items) use **database transactions** (via Supabase Functions or
backend logic) to maintain atomicity and data integrity. Handle
potential rollbacks on failure.\
• Add appropriate database constraints (NOT NULL, CHECK, UNIQUE). Use DB
indexes where appropriate.\
• **Note:** See **Prompt 2.1** for required seed data generation to
populate these tables for testing.

📌 **Prompt 2.1: Seed Data Generation & Testing Plan (NEW PROMPT)**

**Goal:** Create a realistic set of predefined data within your Supabase
instance to facilitate comprehensive development testing across all user
roles and application features.

**Method:** Create this data using SQL scripts, Supabase dashboard
inserts, or a dedicated backend seeding script (/server/seed.js).
**Document the credentials (email/password) used for test accounts.**
Use placeholder images (https://placehold.co/300x200) where actual
images aren\'t available initially.

**Predefined Data Requirements:**

1.  **Customers (3 Accounts):**

    -   **Customer 1:** Name: \"[عميل تجريبي ١]{dir="rtl"}\", Email:
        customer1\@test.com, Pwd: password, Phone: +963911111111,
        Address: \"[المزة، شارع الجلاء، دمشق]{dir="rtl"}\", Lat: 33.508,
        Lng: 36.276, Role: \'customer\'.

    -   **Customer 2:** Name: \"[عميل تجريبي ٢]{dir="rtl"}\", Email:
        customer2\@test.com, Pwd: password, Phone: +963922222222,
        Address: \"[باب توما، ساحة باب توما، دمشق]{dir="rtl"}\", Lat:
        33.514, Lng: 36.312, Role: \'customer\'.

    -   **Customer 3:** Name: \"[عميل تجريبي ٣]{dir="rtl"}\", Email:
        customer3\@test.com, Pwd: password, Phone: +963933333333,
        Address: \"[كفرسوسة، بالقرب من دوار كفرسوسة، دمشق]{dir="rtl"}\",
        Lat: 33.487, Lng: 36.266, Role: \'customer\'. *(Use one account
        for potential blocking/testing edge cases)*

2.  **Restaurants (3 Accounts with Owners):**

    -   **Restaurant Owner 1:** (User) Name: \"[صاحب مطعم
        ١]{dir="rtl"}\", Email: owner1\@test.com, Pwd: password, Phone:
        +963944444444, Role: \'restaurant\'.

    -   **Restaurant 1:** (Linked to Owner 1) Name: \"[مطعم الشام
        الأصيل]{dir="rtl"}\", Desc: \"[مأكولات شرقية
        وغربية]{dir="rtl"}\", Phone: 011-1111111, Address: \"[الشعلان،
        جانب سينما الشام، دمشق]{dir="rtl"}\", Lat: 33.517, Lng: 36.293,
        Logo URL: https://placehold.co/100x100/E8117F/white?text=Rest1.

    -   **Restaurant Owner 2:** (User) Name: \"[صاحب مطعم
        ٢]{dir="rtl"}\", Email: owner2\@test.com, Pwd: password, Phone:
        +963955555555, Role: \'restaurant\'.

    -   **Restaurant 2:** (Linked to Owner 2) Name: \"[بيتزا
        إيطاليانو]{dir="rtl"}\", Desc: \"[أفضل بيتزا في
        المدينة]{dir="rtl"}\", Phone: 011-2222222, Address: \"[أبو
        رمانة، مقابل حديقة الجاحظ، دمشق]{dir="rtl"}\", Lat: 33.519, Lng:
        36.284, Logo URL:
        https://placehold.co/100x100/11E87F/white?text=Rest2.

    -   **Restaurant Owner 3:** (User) Name: \"[صاحب مطعم
        ٣]{dir="rtl"}\", Email: owner3\@test.com, Pwd: password, Phone:
        +963966666666, Role: \'restaurant\'.

    -   **Restaurant 3:** (Linked to Owner 3) Name: \"[برغر
        هاوس]{dir="rtl"}\", Desc: \"[سندويشات برغر مميزة]{dir="rtl"}\",
        Phone: 011-3333333, Address: \"[المزة فيلات غربية، بالقرب من
        مشفى الرازي، دمشق]{dir="rtl"}\", Lat: 33.505, Lng: 36.262, Logo
        URL: https://placehold.co/100x100/7F11E8/white?text=Rest3.

3.  **Menu Items (\>= 5 per Restaurant):**

    -   *Restaurant 1:* Shawarma Chicken (Price: 5000, Desc: [شاورما
        دجاج بالخبز الصاج]{dir="rtl"}), Falafel Plate (3000, [صحن فلافل
        مقرمش]{dir="rtl"}), Hummus (2000, [حمص بالزيت]{dir="rtl"}),
        Tabbouleh (2500, [تبولة شامية]{dir="rtl"}), Mixed Grill (15000,
        [مشاوي مشكلة]{dir="rtl"}). Make Falafel Plate available = false.
        Image URLs: Use placeholders.

    -   *Restaurant 2:* Margherita Pizza (8000), Pepperoni Pizza
        (10000), Vegetable Pizza (9000), Caesar Salad (6000), Garlic
        Bread (3000). Assign descriptions and placeholder image URLs.

    -   *Restaurant 3:* Classic Burger (7000), Cheese Burger (8000),
        Chicken Burger (7500), Fries (2500), Onion Rings (3000). Assign
        descriptions and placeholder image URLs.

4.  **Delivery Persons (3 Accounts):**

    -   **Delivery Person 1:** (User) Name: \"[عامل توصيل
        ١]{dir="rtl"}\", Email: delivery1\@test.com, Pwd: password,
        Phone: +963977777777, Role: \'delivery\'. Seed delivery\_persons
        entry with is\_available = true.

    -   **Delivery Person 2:** (User) Name: \"[عامل توصيل
        ٢]{dir="rtl"}\", Email: delivery2\@test.com, Pwd: password,
        Phone: +963988888888, Role: \'delivery\'. Seed delivery\_persons
        entry with is\_available = true.

    -   **Delivery Person 3:** (User) Name: \"[عامل توصيل
        ٣]{dir="rtl"}\", Email: delivery3\@test.com, Pwd: password,
        Phone: +963999999999, Role: \'delivery\'. Seed delivery\_persons
        entry with is\_available = false.

5.  **Admin (1 Account):**

    -   **Admin 1:** (User) Name: \"[مدير النظام]{dir="rtl"}\", Email:
        moaz1993abdulrahman\@gmail.com, Pwd: 12345678, Phone:
        +963900000000, Role: \'admin\'.

6.  **Orders (\>= 6 Examples, Covering All Statuses):** Create orders
    linking predefined customers and restaurants. Use customer addresses
    & Lat/Lng. Populate order\_items. Payment: \'cod\', \'pending\'.

    -   Order 1 (Cust 1 -\> Rest 1, Shawarma x1): status = \'pending\',
        Total Price: 5000.

    -   Order 2 (Cust 2 -\> Rest 2, Margherita x1, Garlic x1): status =
        \'accepted\', Total Price: 11000.

    -   Order 3 (Cust 1 -\> Rest 2, Pepperoni x2): status =
        \'preparing\', Total Price: 20000.

    -   Order 4 (Cust 3 -\> Rest 1, Mixed Grill x1, Hummus x1): status =
        \'on\_delivery\', Total Price: 17000.

    -   Order 5 (Cust 2 -\> Rest 3, Cheese Burger x1, Fries x1): status
        = \'delivered\', Total Price: 10500.

    -   Order 6 (Cust 1 -\> Rest 3, Classic Burger x1): status =
        \'cancelled\', Total Price: 7000.

7.  **Deliveries (\>= 2 Examples):** Link orders to delivery persons via
    deliveries table.

    -   Delivery for Order 4: order\_id = Order 4 ID,
        delivery\_person\_id = Delivery 1\'s User ID, status =
        \'assigned\'.

    -   Delivery for Order 5: order\_id = Order 5 ID,
        delivery\_person\_id = Delivery 2\'s User ID, status =
        \'delivered\', picked\_up\_at= (some time ago),
        delivered\_at=(later time ago).

**Testing Plan Integration:** This predefined data **MUST** be used for
the specific testing scenarios outlined in Prompts 4, 5, 6, 7, 8, 9, 10,
13, and relevant optional prompts.

**Demo Credentials Summary:**

-   Admin: admin\@test.com / password

-   Customer 1: customer1\@test.com / password

-   Customer 2: customer2\@test.com / password

-   Customer 3: customer3\@test.com / password

-   Restaurant Owner 1: owner1\@test.com / password

-   Restaurant Owner 2: owner2\@test.com / password

-   Restaurant Owner 3: owner3\@test.com / password

-   Delivery Person 1: delivery1\@test.com / password

-   Delivery Person 2: delivery2\@test.com / password

-   Delivery Person 3: delivery3\@test.com / password\
    *(Remember to hash passwords securely during seeding via Supabase
    Auth functions)*

📌 **Prompt 3: Landing Page with RTL Design & Accessibility**

Create a landing page (/) in Arabic with:\
• Logo, Slogan (\"[وصّلناها لعندك]{dir="rtl"} ✨\")\
• Hero section (image/video + CTA button \"[ابدأ الطلب]{dir="rtl"}\"
linking to restaurant browse/signup)\
• \"How it works\" section (Simple steps with icons/illustrations -
[رسوم توضيحية]{dir="rtl"})\
• Testimonials section ([مراجعات من الزبائن]{dir="rtl"} - static
initially, can link to reviews later)\
• Footer (Contact info, social links, privacy policy/terms links)\
• Use Tailwind CSS for responsive, RTL layout.\
• Use Framer Motion for subtle entry animations/transitions.\
• **Note:** Ensure semantic HTML and basic **accessibility (a11y)**
standards (alt text, headings, focus management). Include feedback
messages for any interactive elements (like a contact form, if added)
for validation errors or success.

📌 **Prompt 4: Authentication Pages (Supabase Auth)**

Implement Login and Signup pages using Supabase Auth UI components or
custom forms:\
**Login Page (/login):**\
• Email and password fields.\
• Implement validation (use react-hook-form + zod for instant feedback -
\"[الرجاء إدخال بريد إلكتروني صالح\", \"كلمة المرور
مطلوبة]{dir="rtl"}\").\
• Call Supabase signInWithPassword.\
• On success, redirect users based on their role fetched from the users
table (e.g., /admin, /restaurant/dashboard, /delivery/dashboard,
/restaurants for customer).\
• Display clear error messages (in Arabic) for incorrect credentials,
network issues, etc.\
• **Security Note:** Consider adding backend rate limiting to the login
endpoint.\
**Signup Page (/signup):**\
• Fields: Name, Email, Password, Phone Number, Role (Dropdown: Customer,
Restaurant Owner, Delivery Person).\
• Implement validation for all fields (e.g., password strength, phone
format appropriate for Syria).\
• Call Supabase signUp.\
• On successful signup (email confirmation might be enabled in
Supabase), use the returned user ID to insert additional details (name,
phone, role) into your public users table. Handle potential errors
during this secondary insert. *(Restaurant owners will need linking to a
restaurants entry, potentially an admin approval step later).*\
• Provide clear success/error messages (e.g., \"[تم التسجيل بنجاح، يرجى
التحقق من بريدك الإلكتروني\", \"رقم الهاتف مستخدم
بالفعل]{dir="rtl"}\").\
• Handle session expiration and unauthorized access attempts gracefully
(redirect to login).

-   **Testing with Predefined Data:**

    -   Attempt login with customer1\@test.com / password. Verify
        successful login and redirect to customer view (/restaurants).

    -   Attempt login with owner1\@test.com / password. Verify
        successful login and redirect to /restaurant/dashboard.

    -   Attempt login with delivery1\@test.com / password. Verify
        successful login and redirect to /delivery/dashboard.

    -   Attempt login with admin\@test.com / password. Verify successful
        login and redirect to /admin/dashboard.

    -   Attempt login with incorrect password for customer1\@test.com.
        Verify appropriate Arabic error message.

    -   Attempt login with a non-existent email. Verify appropriate
        error message.

    -   Test signup flow with a new, unique email/phone. Verify user is
        created with the selected role (if signup allows role selection,
        otherwise default to \'customer\').

📌 **Prompt 5: Restaurant Dashboard (Protected by Role)**

Create a dashboard accessible only to users with the \'restaurant\' role
(/restaurant/dashboard):\
• **Profile Management:** View/Edit restaurant details (name,
description, phone, address - potentially map update). Handle image
upload for logo\_url using **Supabase Storage**.\
• **Menu Management:**\
\* Display list of current menu items.\
\* Add new menu item form (name, description, price, image, availability
toggle). Implement image upload to Supabase Storage.\
\* Edit existing menu items.\
\* Delete menu items (consider soft delete or confirmation).\
• **Orders Interface:**\
\* View incoming orders, filterable by status (\'pending\',
\'accepted\', \'preparing\', \'ready\_for\_pickup\').\
\* Ability to change order status (e.g., \'pending\' -\> \'accepted\',
\'accepted\' -\> \'preparing\', \'preparing\' -\>
\'ready\_for\_pickup\').\
• **UX/Error Handling:**\
\* Use loading states (spinners/skeletons) while data is fetched or
mutations are in progress.\
\* Implement toast notifications (e.g., using react-hot-toast) for
success/error messages (item added, status updated, upload failed).\
\* Validate all form inputs rigorously. Provide clear Arabic error
messages for failures (upload error, invalid price, network issue).\
\* Implement structured server-side logging (in the backend API handling
these requests) for significant actions and errors.

-   **Testing with Predefined Data:**

    -   Log in as owner1\@test.com.

    -   **Profile:** Verify Restaurant 1\'s details (name, phone,
        address from seed data) are displayed and editable. Test
        updating the description.

    -   **Menu:** Verify Restaurant 1\'s predefined menu items
        (Shawarma, Falafel etc.) are listed. Check that Falafel shows as
        unavailable. Test Adding a new item (\" [فتة
        شامية]{dir="rtl"}\"). Test Editing the price of Shawarma. Test
        Deleting \"Tabbouleh\". Test toggling available status for
        Shawarma (make unavailable, then available again).

    -   **Orders:** Verify predefined orders for Restaurant 1 are
        displayed (Order 1 - pending, Order 4 - on\_delivery). Test
        filtering orders by status (\'pending\'). Test changing status
        of Order 1 (\'pending\') to \'accepted\'. Verify the change is
        reflected and it disappears from the \'pending\' filter view.

    -   **Error Handling:** Test adding a menu item with a negative
        price. Verify validation error message. Try editing profile with
        invalid phone format. Verify error.

📌 **Prompt 6: Customer Interface (Arabic RTL, Location-Aware)**

Create the main interface for users with the \'customer\' role:\
• **Browse Restaurants (/restaurants):**\
\* Display list/grid of restaurants.\
\* Fetch user\'s location (request permission gracefully).\
\* Sort/filter restaurants (e.g., by distance from user - requires
backend logic using latitude/longitude).\
\* Search functionality by name or description keywords.\
• **View Restaurant Menu (/restaurants/:id):**\
\* Display restaurant details (name, logo, description).\
\* Show menu items with images, descriptions, prices. Indicate
unavailable items clearly.\
• **Shopping Cart:**\
\* Ability to add/remove items to a cart.\
\* Manage cart state (consider **React Context API or Zustand**).\
\* Display cart summary (items, quantities, total price).\
• **Checkout Process (/checkout):**\
\* Display order summary.\
\* **Address Input:** Use **Google Maps Places Autocomplete API** for
easy address input and/or a map interface (Google Maps Embed/JS API) for
pin-dropping. Ensure address fields are flexible for **Syrian address
formats**. Allow manual refinement. Validate the selected
location/address.\
\* Select payment method (initially focus on \'Cash on Delivery\').\
• **Place Order:**\
\* On submission, send order details (customer ID, restaurant ID, items,
address, lat/lng, total price, payment info) to the backend.\
\* Backend logic should create records in orders and order\_items tables
**within a database transaction**.\
\* Provide clear feedback (success message with order summary/ID, or
error message).\
• **Order Tracking (Basic) (/orders or /orders/:id):**\
\* View past orders and their current status. (Real-time updates in
Prompt 13).

-   **Testing with Predefined Data:**

    -   Log in as customer1\@test.com.

    -   **Browse:** Verify predefined Restaurants 1, 2, 3 are listed.
        Use browser location simulation (or allow permission) to test
        distance sorting based on Customer 1\'s seeded address.

    -   **Search/Filter:** Search for \"Pizza\". Verify Restaurant 2
        appears. Search for \"[شرقية]{dir="rtl"}\". Verify Restaurant 1
        appears.

    -   **View Menu:** Navigate to Restaurant 2\'s menu. Verify its
        predefined items (Margherita, Pepperoni etc.) are displayed.
        Navigate to Restaurant 1\'s menu, verify Falafel is marked
        unavailable.

    -   **Cart:** Add Margherita Pizza (Rest 2) and Garlic Bread
        (Rest 2) to the cart. Verify cart updates. Go to Rest 3\'s menu
        and add Classic Burger. Verify cart shows items from different
        restaurants correctly (or implement logic to restrict cart to
        one restaurant at a time if desired - clarify requirement).
        *Assuming single-restaurant cart:* Clear cart, add Cheese Burger
        (Rest 3) x2 and Fries (Rest 3) x1. Verify total. Adjust quantity
        of burgers to 1. Remove Fries.

    -   **Checkout:** Proceed to checkout (assuming cart now only has
        items from Rest 3). Verify Customer 1\'s predefined address is
        available/selected. Use Google Maps picker to select Customer
        2\'s seeded address location.

    -   **Place Order:** Place a new order (CoD) for Restaurant 3 using
        Customer 2\'s address. Verify success message. Check Supabase to
        confirm the new order is created correctly for Customer 1 -\>
        Restaurant 3 with status \'pending\' and correct
        items/address/price.

    -   **Order Tracking:** View order history. Verify the newly placed
        order and predefined orders involving Customer 1 (Order 1, Order
        3, Order 6) appear with correct statuses.

    -   **Error Handling/Edge Cases:**

        -   Attempt checkout with map picker selecting a location far
            outside Damascus. Add validation if a service area is
            defined. Verify error message.

        -   Try to add the unavailable Falafel (Rest 1) to cart. Verify
            it\'s disabled or throws an error.

        -   Log out and try accessing /checkout. Verify redirection to
            login.

📌 **Prompt 7: Delivery Person Dashboard (Protected by Role)**

Create a dashboard accessible only to users with the \'delivery\' role
(/delivery/dashboard):\
• **Availability Toggle:** Allow delivery person to set their status
(delivery\_persons.is\_available).\
• **Assigned Deliveries:**\
\* View list of orders assigned to them (via deliveries table),
filterable by status (\'assigned\', \'picked\_up\').\
\* Show key order info (order ID, restaurant name/address, customer
name/address, payment method - highlight CoD amount).\
• **Order Detail View (/delivery/orders/:id):**\
\* Show detailed order information.\
\* Display **Restaurant and Customer locations on an embedded Google
Map**.\
\* Provide button/option to **launch Google Maps Directions** for the
route (Restaurant -\> Customer).\
• **Status Updates:**\
\* Buttons to update delivery status (\'picked\_up\', \'delivered\',
\'failed\_delivery\'). This updates the deliveries table and potentially
the orders table status (e.g., \'on\_delivery\' -\> \'delivered\').\
• **Real-time Location (Optional but Recommended):** Use the
**Geolocation API** to periodically update the delivery person\'s
current\_lat, current\_lng in the delivery\_persons table (handle
permissions).\
• **Error Handling:** Provide feedback for errors (e.g., \"Failed to get
current location\", \"Unable to update delivery status\", \"Failed to
load directions\"). Verify location accuracy/routing within the **Syrian
context**.

-   **Testing with Predefined Data:**

    -   Log in as delivery1\@test.com.

    -   **Availability:** Verify toggle shows \'Available\'. Toggle it
        off. Verify change persists in Supabase delivery\_persons table.
        Toggle it back on.

    -   **Assigned Deliveries:** Verify Order 4 (pre-assigned in seed
        data) is displayed in the \'assigned\' list.

    -   **Order Detail:** View details for Order 4. Verify map shows
        markers for Restaurant 1\'s address and Customer 3\'s address
        (using seeded Lat/Lng). Test the \"Get Directions\" link.

    -   **Status Updates:** Update status for the delivery of Order 4
        from \'assigned\' to \'picked\_up\'. Verify the status changes
        in the UI and DB. Later, update to \'delivered\'. Verify this
        changes the status in deliveries and also updates orders table
        status for Order 4 to \'delivered\'.

    -   Log in as delivery3\@test.com (initially unavailable). Verify
        they see no assigned orders. Toggle availability on. (Admin
        might need to assign an order manually for further testing).

📌 **Prompt 8: Admin Panel (Secure & Global Overview - Protected by
Role)**

Create a dashboard accessible only to users with the \'admin\' role
(/admin/dashboard):\
• **Overview/Statistics:** Display key metrics (Total Orders, Revenue
Today/Week, Active Restaurants, Available Delivery Persons - derive from
seeded data initially).\
• **User Management:**\
\* View/Search all users (users table).\
\* Ability to change user roles.\
\* Ability to block/suspend users (add an is\_active boolean column to
users table or similar - need schema update if implementing block).\
• **Restaurant Management:**\
\* View/Search all restaurants.\
\* Approve/Reject new restaurant registrations (if an approval flow is
added).\
\* View restaurant menus/orders.\
• **Order Management:**\
\* View/Search all orders.\
\* Ability to manually change order status (with caution).\
\* View delivery assignments and statuses.\
• **Delivery Person Management:**\
\* View/Search delivery persons.\
\* Monitor availability and potentially assign orders manually (if
needed - requires UI to select order & available driver).\
• **Reporting (Optional):** Add functionality to export data (users,
orders) to CSV.\
• **Security & Logging:** Ensure robust RLS prevents non-admins access.
Log significant admin actions (user blocks, manual status changes, role
changes) on the server-side. Provide feedback for any failed actions.

-   **Testing with Predefined Data:**

    -   Log in as admin\@test.com.

    -   **View Data:** Verify you can view lists of all predefined users
        (customers, owners, delivery, admin), restaurants (1, 2, 3), and
        orders (1-6). Test search/filter functionality (e.g., search
        user customer2\@test.com, filter orders by \'delivered\' status
        -\> should show Order 5).

    -   **User Management:** Find customer3\@test.com. *If block feature
        implemented:* Block user, test login as Customer 3 (should
        fail), unblock. Find customer1\@test.com, change role to
        \'admin\', verify, change back to \'customer\'.

    -   **Restaurant Management:** View details for Restaurant 1, 2, 3.

    -   **Order Management:** Find Order 2 (\'accepted\'). Manually
        change its status to \'cancelled\'. Verify the change in the
        order list and DB. Find Order 3 (\'preparing\'), manually change
        it to \'on\_delivery\'. Verify.

    -   **Delivery Management:** View list of delivery persons (1, 2,
        3). Check their is\_available status (should match seed
        data/toggles). *If manual assignment implemented:* Find a
        \'pending\' or \'accepted\' order (e.g., the new one placed by
        Customer 1) and attempt to assign it to delivery2\@test.com.
        Verify a deliveries record is created.

📌 **Prompt 9: Google Maps API Integration**

Implement Google Maps functionality across the app:\
• **Places Autocomplete:** Use Maps JavaScript API Places Library for
address input in Customer Checkout (Prompt 6) and potentially Restaurant
Profile (Prompt 5).\
• **Map Display & Markers:** Use Maps JavaScript API or a React wrapper
(e.g., \@react-google-maps/api) to display maps with markers for:\
\* Restaurant locations (Customer browse, Delivery dashboard).\
\* Customer location (Delivery dashboard).\
\* Location Picker (Customer checkout - allow dropping a pin).\
• **Directions Service:** Use Maps JavaScript API Directions Service
to:\
\* Show delivery route on map for Delivery Person (Prompt 7).\
\* Potentially calculate estimated delivery time/distance.\
• **Geolocation:** Use browser Geolocation API (with user permission) to
get:\
\* Customer\'s current location for sorting nearby restaurants (Prompt
6).\
\* Delivery person\'s real-time location (Prompt 7).\
• **Interactive Testing & Context:**\
\* **Test rigorously with locations within Damascus and Syria.** Verify
geocoding accuracy for local address formats. Check if Autocomplete
suggestions are relevant.\
\* Ensure the address/lat/lng selected via map/autocomplete is correctly
saved to Supabase.\
\* Test the location permission request flow -- provide clear
instructions (in Arabic) if denied.\
\* Handle potential API errors (quota exceeded, invalid request, network
issues) gracefully.\
\* Consider API cost implications and implement optimizations if
necessary (e.g., debounce Autocomplete requests).

-   **Testing with Predefined Data:**

    -   **Markers:** Verify map markers display accurately for
        predefined Restaurant locations (Rest 1, 2, 3) and Customer
        addresses (Cust 1, 2, 3 - from seed data, used in
        orders/checkout) using their seeded Lat/Lng values. Maps should
        center correctly on Damascus.

    -   **Autocomplete:** During customer checkout (Prompt 6), start
        typing a seeded address (e.g., \"[الشعلان]{dir="rtl"}\"). Verify
        relevant suggestions appear. Select one and check if Lat/Lng are
        populated correctly.

    -   **Directions:** In Delivery Dashboard (Prompt 7), test the \"Get
        Directions\" link for the delivery associated with Order 4.
        Verify it opens Google Maps with the correct route between
        Restaurant 1\'s location (Shalaan) and Customer 3\'s address
        (Kafersouseh) using seeded Lat/Lng.

    -   **Accuracy:** Visually confirm that the Lat/Lng values used in
        seeding correspond reasonably to the addresses within Damascus
        on the map interface.

📌 **Prompt 10: Authentication & Role-Based Routing (with Protection)**

Implement secure routing based on user authentication status and role:\
• Use Supabase client (supabase.auth.getSession(),
supabase.auth.onAuthStateChange()) to manage auth state in React (e.g.,
in a Context provider).\
• Protect routes based on authentication status (redirect to /login if
not logged in).\
• Implement **Role-Based Access Control (RBAC)** for dashboards:\
\* Fetch user\'s role from the users table after login and store it in
auth context/state.\
\* Create wrapper components (ProtectedRoute) that check the required
role(s) for accessing specific routes (/admin/\*, /restaurant/\*,
/delivery/\*).\
\* Redirect users to an appropriate page (e.g., home or unauthorized
page) if they try to access a dashboard not matching their role.\
• **Error Handling and Testing:**\
\* Test login with valid/invalid credentials (verify error messages from
Prompt 4).\
\* Test redirection logic thoroughly -- ensure correct dashboard access
per role and effective blocking of unauthorized access.\
\* Test session persistence (e.g., after page refresh) and handling of
expired sessions.\
\* **Crucially, test that RLS policies (Prompt 2) align with routing
restrictions**, preventing API-level data access even if a user somehow
bypasses frontend routing.

-   **Testing with Predefined Data:**

    -   Perform all login tests specified in Prompt 4 to verify correct
        role detection and redirection.

    -   Log in as customer1\@test.com. Attempt to navigate directly to
        /admin/dashboard or /delivery/dashboard or
        /restaurant/dashboard. Verify redirection or an \"Unauthorized\"
        message.

    -   Log in as owner1\@test.com. Attempt to navigate to
        /admin/dashboard or /delivery/dashboard. Verify
        failure/redirection. Ensure access to /restaurant/dashboard.

    -   Log in as delivery1\@test.com. Attempt to navigate to
        /admin/dashboard or /restaurant/dashboard. Verify
        failure/redirection. Ensure access to /delivery/dashboard.

    -   **RLS Alignment:** (Crucial Integration Test) While logged in as
        customer1\@test.com, use browser dev tools (or a separate API
        client like Postman/Insomnia with the auth token) to *attempt
        direct API calls* or Supabase client calls that should be
        restricted by RLS (e.g.,
        supabase.from(\'users\').select(\'\*\'),
        supabase.from(\'orders\').select(\'\*\').eq(\'customer\_id\',
        customer2\_id), supabase.from(\'restaurants\').update({ name:
        \'Hacked\' }).eq(\'id\', restaurant1\_id)). Verify these calls
        fail with appropriate errors (e.g., 403 Forbidden, empty results
        due to policy, or Supabase RLS errors indicating policy
        violation). Repeat similar direct access tests while logged in
        as Owner 1 (should only modify own restaurant/menu/orders) and
        Delivery 1 (should only access assigned deliveries/related
        info). Admin should have broader (but still defined) access.

📌 **Prompt 11: Payment Integration Strategy**

Plan and implement the payment flow:\
• **Initial Focus:** Implement **Cash on Delivery (CoD)** as the primary
method.\
\* Add UI elements to select CoD during checkout.\
\* Store payment\_method (\'cod\') and payment\_status (\'pending\') in
the orders table.\
\* Ensure delivery persons are informed it\'s a CoD order (show amount).
Update payment\_status to \'paid\' upon successful delivery confirmation
(potentially requires another action by driver/admin).\
• **Future Consideration (Research Required):**\
\* Investigate available **online payment gateways in Syria**.\
\* If feasible, plan integration steps.\
• **Error Handling:** Handle potential payment failures (both CoD
reporting issues and online gateway errors).

📌 **Prompt 12: Testing Strategy Definition**

Define and implement a comprehensive testing strategy:\
• **Unit Tests (Core Requirement):**\
\* Use **Vitest or Jest** framework.\
\* Test critical backend utility functions (e.g., price calculations,
input validation logic).\
\* Test frontend helper functions, custom hooks, and potentially state
manipulation logic.\
• **Integration Tests:**\
\* Test API endpoints directly (using tools like Supertest for Express
or testing Supabase Functions if used). Verify request/response schemas
and status codes.\
\* **Crucially, test Supabase RLS policies** by making authenticated
requests as different user roles (using demo accounts) and asserting
correct data access (fetch data, attempt mutations).\
\* Test interactions between frontend components and backend/Supabase
(e.g., form submission creates data correctly).\
• **End-to-End (E2E) Tests (Recommended):**\
\* Use **Cypress or Playwright**.\
\* Simulate key user journeys *using demo accounts and interacting with
seeded data*: Signup -\> Login -\> Browse Restaurants -\> Add to Cart
-\> Checkout (with Map) -\> Place Order (CoD) -\> (Restaurant Owner)
View & Accept Order -\> (Delivery Person) Accept & Deliver Order -\>
(Admin) View Order.\
\* Verify UI elements, interactions, and expected outcomes across the
full stack.\
• **Manual Testing:** Perform thorough manual testing focusing on UX,
usability (especially RTL layout), edge cases, and testing within the
**Syrian context (maps, addresses)** using the demo accounts.

📌 **Prompt 13: Real-time Order Status Updates (Core UX)**

Implement real-time functionality using **Supabase Realtime
Subscriptions**:\
• **Customer View:** Subscribe to changes in the orders table (filtered
by the customer\'s ID). Update UI automatically when status changes.\
• **Restaurant View:** Subscribe to new records/changes in orders table
(filtered by the restaurant\'s ID) to show new/updated orders in near
real-time.\
• **Delivery View:** Subscribe to changes in assigned deliveries or
relevant orders table.\
• **Admin View:** Subscribe to *all* orders for a global overview
(optional, might be heavy).\
• **Implementation:** Use supabase-js client\'s .channel() and
.subscribe() methods. Handle subscription setup, cleanup, and potential
errors.

-   **Testing with Predefined Data:**

    -   Open multiple browser windows/tabs.

    -   Window 1: Log in as customer1\@test.com, view Order 1
        (\'pending\').

    -   Window 2: Log in as owner1\@test.com (owns Restaurant 1), view
        incoming orders.

    -   In Window 2 (Owner 1), change the status of Order 1 to
        \'accepted\'. **Verify the status updates immediately (without
        page reload) in Window 1 (Customer 1\'s view).**

    -   Window 3: Log in as admin\@test.com.

    -   Window 4: Log in as delivery1\@test.com.

    -   In Window 3 (Admin), find Order 4 (\'on\_delivery\', assigned to
        Delivery 1) and manually change status to \'preparing\'
        (simulate rollback/correction). Verify status updates in
        real-time for Customer 3 (if logged in), Owner 1, and
        Delivery 1.

    -   In Window 4 (Delivery 1), update delivery status for Order 4
        (assuming admin changed it back to \'on\_delivery\') to
        \'delivered\'. Verify status updates for Customer 3, Owner 1,
        and Admin.

**Optional Advanced Prompts (14--22)**

1.  **Image Uploads:** Implement image uploads for
    menu\_items.image\_url and restaurants.logo\_url using **Supabase
    Storage**. Test by uploading images for seeded items/restaurants.

2.  **Ratings & Reviews:** Add reviews table. Implement UI for customers
    to leave reviews on \'delivered\' orders. Display average
    ratings/reviews. Update RLS. **Testing:** Use customer2\@test.com to
    review Order 5 (delivered from Rest 3). Verify review saved. Log in
    as owner3\@test.com/admin\@test.com to view.

3.  **Internationalization (i18n):** Add basic i18n support (e.g.,
    i18next) for Arabic/English toggle.

4.  **Push Notifications:** Integrate (OneSignal/FCM). **Testing:**
    Trigger status changes using predefined accounts (e.g., Owner 2
    accepts Order 2). Verify push notifications are sent/received by
    relevant demo users (Customer 2).

5.  **Enhanced UX:** Implement Skeleton Loaders, React Error Boundaries,
    debouncing/throttling.

6.  **Progressive Web App (PWA):** Add manifest.json and service worker.

7.  **Server-Side Rendering (SSR) / Static Site Generation (SSG):**
    Consider Next.js/Remix.

8.  **README.md:** Generate comprehensive README detailing setup
    (including seed script execution), environment variables,
    architecture, running instructions, deployment notes, **and listing
    the demo account credentials**.

9.  **Deployment Checklist:** Create checklist for production
    deployment.

**Additional Notes for AI Agent & Developer:**

-   **Use Seed Data:** Actively use the predefined accounts and data
    (Prompt 2.1) throughout development and manual testing to test each
    feature from the perspective of different roles.

-   **Test Error Handling:** Intentionally input invalid data based on
    the predefined structures (e.g., wrong phone format during signup,
    invalid address during checkout, non-numeric price for menu item,
    attempt actions forbidden by RLS) to ensure robust validation and
    clear Arabic error messages are displayed.

-   **Test UI Interactions:** Click through all buttons, forms, and
    navigation elements using the predefined data scenarios to ensure a
    smooth and bug-free user experience across all interfaces. Verify
    RTL layout consistency.

-   **Seed Script Maintenance:** Keep the seed script updated as the
    schema evolves. Ensure it\'s idempotent or handles existing data
    gracefully if run multiple times. Document its usage clearly.

\-\-- END OF COMPLETE FILE my\_project\_prompts\_v2.1\_with\_data.txt
\-\--
