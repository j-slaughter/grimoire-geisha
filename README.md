<h1 align="center">E-Commerce Store 🛒</h1>

Born in Los Angeles, Grimoire Geisha™ is a lifestyle clothing brand. Centered around gaming culture and Japanese animations, Grimoire Geisha™ inspires to create wearable art.

![Preview App](/client/public/gg-preview.gif)

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
├── lib/
│   ├── axios.js          # Axios config
├── pages/                # Application views
│── store/
│    └── reducers/        # Reducers for user, cart, product states
server/
├── controllers/          # Functionality for analytics/auth/cart/coupons/payment/products
├── lib/                  # Database and Third-Party API config
├── middleware/
│   ├── auth.middleware.js   # Authentication and authorization middleware
├── models/               # Database models for coupons/orders/products/users
└── routes/               # Routers for analytics/auth/cart/coupons/payment/products
```

## Technical Details

- 💻 Built with React 19, Redux and JavaScript
- 🔑 Express API and middleware
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
