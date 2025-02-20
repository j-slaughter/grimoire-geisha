/**
 * @module payment.controller.js
 * @description Controller for handling payment
 */
import { stripe } from '../lib/stripe.js';

/**
 * createStripeCoupon - creates a Stripe coupon object and returns the id
 */
const createStripeCoupon = async function (discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
  });
  return coupon.id;
};

/**
 * createCheckoutSession - creates a Stripe checkout session
 */
export const createCheckoutSession = async (req, res) => {
  try {
    // Get products in user's cart and validated coupon discount
    const { products, couponDiscount } = req.body;
    // Check for no products
    if (products.length === 0) {
      // 400 (Bad Request)
      return res.status(400).json({ message: 'No products found to checkout' });
    }
    // Initialize total to 0
    let total = 0;

    // Generate lineItems for Stripe checkout session (Ref docs: https://docs.stripe.com/api/checkout/sessions/create)
    const lineItems = products.map((product) => {
      // Calculate individual price of product in cents (must be cents per Stripe docs)
      let amount = Math.round(product.price * 100);
      // Multiply amount by quantity of product
      amount *= product.quantity;
      // Update total amount
      total += amount;
      // Return Stripe lineItem product
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity,
      };
    });

    // Check for coupon discount
    if (couponDiscount) {
      // Apply coupon discount to total
      total -= Math.round((total * couponDiscount) / 100);
    }

    // Initialize Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      discounts: couponDiscount
        ? [
            {
              coupon: await createStripeCoupon(couponDiscount),
            },
          ]
        : [],
      mode: 'payment',
      metadata: {
        userId: req.user._id.toString(),
        couponDiscount: couponDiscount || 'No coupon discount',
      },
      success_url: `${process.env.CLIENT_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`,
    });

    // Return calculated total and session id
    return res.status(200).json({ id: session.id, totalAmount: total / 100 });
  } catch (error) {
    return res.status(500).json({ message: `Error creating checkout session: ${error.message}` });
  }
};
