/**
 * @module stripe.js
 * @description Sets up Stripe connection
 */
import Stripe from 'stripe';

// For v17.x.x or later, use placeholder to avoid error about missing API key during build step
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'api_key_placeholder');
