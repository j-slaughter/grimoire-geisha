/**
 * @module stripe.js
 * @description Sets up Stripe connection
 */
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'api_key_placeholder');
