import express from 'express';
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import paymentRoutes from './routes/payment.route.js';
import { connectDB } from './lib/db.js';

const app = express();
const PORT = process.env.PORT || 5000;
// Needed to have ESM recognize __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
// Parse data client sends as JSON with Content-Type: application/json
app.use(express.json());
// Parse data client sends in HTML forms with Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Authentication
app.use('/api/auth', authRoutes);

// Handling Products
app.use('/api/products', productRoutes);

// Handling Checkout Cart
app.use('/api/cart', cartRoutes);

// Handling Coupons
app.use('/api/coupons', couponRoutes);

// Handling Payment
app.use('/api/payment', paymentRoutes);

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404);
  // respond with custom html page
  // if (req.accepts('html')) {
  //     return res.sendFile(path.join(__dirname, '404'));
  // }
  return res.send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.send(`Global error handler: ${err.message}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // Connect to database
  connectDB();
});
