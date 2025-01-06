# Headless WooCommerce Demo

This project is a demonstration of a headless e-commerce setup using Astro as the frontend framework, integrated with a WooCommerce backend and Stripe for payment processing.

## 🚀 Features

- **Astro Frontend**: Built with Astro for fast, modern, and modular development.
- **WooCommerce Integration**: Connects to a WooCommerce backend for managing products, orders, and cart functionality.
- **Stripe Payment Gateway**: Handles payments via Stripe, ensuring secure and reliable transactions.
- **Dynamic Cart Updates**: Includes a cart system that updates dynamically as users add or remove items.
- **Post Section**: Displays posts fetched from the WooCommerce backend.
- **Shop Section**: Shows all products available in the WooCommerce store.

## 🛠 Setup

### Prerequisites

1. Ensure you have a WooCommerce backend up and running.
2. Create a `.env` file in the project root with the following content:
   ```env
   PUBLIC_API_URL=http://your-backend-url
   ```
   Replace `http://your-backend-url` with the URL of your WooCommerce backend.

### Installation

1. Clone the repository.
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the development server.
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:4321` to see the project in action.

## 📂 Project Structure

```text
/
├── public/             # Static assets (images, icons, etc.)
├── src/
│   ├── components/     # Reusable components
│   ├── layouts/        # Layout components
│   ├── pages/          # Application pages (Shop, Posts, Cart)
│   ├── helpers/        # Utility functions
├── package.json        # Project metadata and dependencies
└── .env                # Configuration for backend URL
```

## 🔍 Sections

### Posts
- Displays all posts fetched from the WooCommerce backend.

### Shop
- Lists all products available in the WooCommerce store.
- Supports adding items to the cart and viewing product details.

### Cart
- Dynamically updates as users add or remove products.
- Includes a checkout flow integrated with Stripe.

## ⚠️ Note

This project is intended for demonstration purposes only. It showcases how to connect a WooCommerce backend to a modern frontend framework and integrate payment functionality via Stripe.

For production use, additional steps for deployment, security, and optimization are required.
