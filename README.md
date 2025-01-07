# WooCommerce Headless Demo: Full Stack Project

## 🚀 Project Overview

This project demonstrates a headless e-commerce workflow built with Astro for the frontend and WordPress for the backend. It integrates WooCommerce, CoCart, and a custom plugin to provide a seamless shopping experience. The custom plugin enables Stripe payment integration and manages WooCommerce orders programmatically.

---

## 🖥️ Project Structure

### Frontend (Astro)
- **Technology:** Astro framework, Tailwind CSS
- **Features:**
  - Displays posts and products dynamically fetched from the backend.
  - Integration with Stripe Checkout for payments.
  - Cart updates in real-time.

### Backend (WordPress)
- **Technology:** WordPress with WooCommerce.
- **Features:**
  - WooCommerce for product management.
  - CoCart for cart API management.
  - A **custom plugin** that integrates Stripe payments and WooCommerce order creation.
  - Logs enabled for debugging purposes.

---

## 📂 File Structure

```plaintext
Frontend (Astro):
/
├── public/              # Static assets
├── src/
│   ├── components/      # Components
│   ├── layouts/         # Reusable layouts
│   ├── pages/           # Pages like posts, shop, cart
│   └── helpers/         # Helper functions for cart and API handling
└── package.json         # Project dependencies

Backend (WordPress):
wooheadless.zip          # A pre-configured WordPress instance
```

---

## 🛠️ Setup Instructions

### Frontend
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Access the frontend at `http://localhost:4321`.

3. **Environment Variables:**
   Configure the `.env` file with your backend URL:
   ```plaintext
   PUBLIC_API_URL=http://your-backend.local/wp-json
   ```

### Backend
1. **Install WordPress:**
   Import the `wooheadless.zip` file using Local (or another tool).
   - [Local by Flywheel Documentation](https://localwp.com/help-docs/) for guidance.
   - Alternatively, unzip it and place the extracted files in your local WordPress environment.
   - I use "admin" as the username and password for development.
   - Set up Site Address (URL) on settings to the new frontend (http://localhost:4321). 

2. **Activate Plugins:**
   - WooCommerce (The Home section doesnt work with a headless frontend cause it tries to launch the setup wizard. It needs to be deactivated in the future. The rest of the sections work as intended: orders, etc.)
   - CoCart
   - Custom Plugin (Stripe CoCart Integration)
   - Classic Editor

3. **Custom Plugin Configuration:**
   - Navigate to **Stripe CoCart** in the WordPress admin menu.
   - Set the following fields:
     - **Stripe Secret Key:** Your Stripe API Secret. When using the testing secret key use the next card number: 4242 4242 4242 4242 and any data. 
     - **Success URL:** Redirect URL after successful payment (e.g., `http://localhost:4321/checkout-success`).
     - **Cancel URL:** Redirect URL after payment cancellation (e.g., `http://localhost:4321/cartView`).

4. **Debugging & Logs:**
   - Debugging is enabled for development purposes.
   - Logs are stored in the WordPress `wp-content/debug.log` file.

---

## 🧩 How the Custom Plugin Works

### Overview
The **Stripe CoCart Integration Plugin** connects the WooCommerce backend with Stripe Checkout. It performs the following functions:
1. **Stripe Session Creation:**
   - Handles cart items sent from the frontend and creates a Stripe Checkout session.
2. **Order Management:**
   - Upon payment success, retrieves customer details and cart data.
   - Creates a WooCommerce order programmatically.
   - Clears the cart after order creation.

### Integration with Other Plugins
- **CoCart:** Provides REST API endpoints for cart management.
- **WooCommerce:** Handles product inventory and orders.
- **Classic Editor:** Simplifies content management in WordPress.

### Plugin Location
- Found in `wp-content/plugins/stripe-cocart-integration/`.

### Configuration Steps
1. Navigate to **Stripe CoCart** in the WordPress dashboard.
2. Fill in the required API keys and URLs.
3. Test the integration by making a purchase through the frontend.

---

## 🎨 Features

### Frontend
- Dynamic product and post listings.
- Stripe-powered checkout.
- Real-time cart updates.

### Backend
- Customizable WooCommerce products.
- API-driven cart and checkout workflows.
- Detailed error logs for debugging.

---

## 🧑‍💻 Development Notes

This project is a demo to illustrate the integration of WordPress and Astro in a headless architecture. Future projects will need to implement better security and practices. It demonstrates how to:
- Create API-driven workflows.
- Leverage WordPress as a backend for modern web apps.
---

## ❓ Troubleshooting
- **Frontend not connecting to backend:** Ensure `PUBLIC_API_URL` in `.env` points to your WordPress instance.
- **Plugin errors:** Check the logs in `wp-content/debug.log`.

---

## 🛒 Sections Explained

### Posts
- Displays WordPress posts dynamically fetched via API.

### Shop
- Lists WooCommerce products with real-time pricing.

### Cart
- Updates in real-time using CoCart API.

---

## 🔗 Links
- [Astro Documentation](https://docs.astro.build/)
- [WooCommerce Documentation](https://woocommerce.com/documentation/)
- [CoCart Documentation](https://cocart.dev/)
- [Stripe Documentation](https://stripe.com/docs/)
