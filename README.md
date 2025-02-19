<h1 align="center">E-Commerce Store 🛒</h1>

Born in Los Angeles, Grimoire Geisha is a lifestyle clothing brand. Centered around gaming culture and Japanese animations, Grimoire Geisha inspires to create wearable art.

## Features

- Product and category management
- Shopping cart functionality with coupon code system
- Admin Dashboard with sales analytics
- Clean, modern UI with Tailwind CSS
- Seamless, intuitive e-commerce store UX

## Project Structure

The project follows both React and Express best practices with a modularized architecture:

```
src/
├── components/           # Functionality for React components
├── TBD/
│   ├── TBD
│   └── TBD
│── stores/               # State management
│    └── TBD/
server/
├── controllers/          # Functionality for auth/cart/coupons/payment/products
├── lib/                  # Database and Third-Party API config
├── middleware/
│   ├── auth.middleware.js   # Authentication and authorization middleware
├── models/               # Database models for coupons/orders/products/users
└── routes/               # Routers for auth/cart/coupons/payment/products
```

## Technical Details

- 💻 Built with React 19 and JavaScript
- 🎨 Styled using Tailwind CSS
- 🚀 Vite for fast development and building
- 🔐 Robust authentication system using JWT
- 💳 Payment management with Stripe API integration
- 🗄️ Database management with MongoDB
- 💨 Fast caching with Redis

## Development

1. Install dependencies:

```bash
npm install
```

2. Build for production:

```bash
npm run build
```

3. Start the server:

```bash
npm run start
```
