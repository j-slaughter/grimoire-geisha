/**
 * @module PaymentSuccess.jsx
 * @description Redirect page when user successfully completes a cart payment. Processes the order.
 */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react';

import {
  loadCart,
  updateCoupon,
  updateSubtotal,
  updateTotal,
} from '../store/reducers/cartReducer.js';
import axios from '../lib/axios.js';

function PaymentSuccess() {
  // Save order number
  const [orderNumber, setOrderNumber] = useState('');
  // Needed to update the Redux store
  const dispatch = useDispatch();

  /**
   * clearCart - clears user's shopping cart
   */
  const clearCart = async () => {
    // Reset Redux store
    dispatch(loadCart([]));
    dispatch(updateCoupon(null));
    dispatch(updateSubtotal(0));
    dispatch(updateTotal(0));
    // Clear all cart items in database
    try {
      await axios.delete('/cart');
    } catch (error) {
      console.error(`An error occurred deleting cartItems in database: ${error}`);
    }
  };

  // Process the order on successful payment
  useEffect(() => {
    const processOrder = async (sessionId) => {
      try {
        // Create order in database
        const res = await axios.post('/payment/checkout-success', { sessionId });
        setOrderNumber(res.data.order._id);
        // Clear user's cart
        clearCart();
      } catch (error) {
        console.error(`Error processing order: ${error}`);
      }
    };

    // Grab sessionId from the url search param
    const sessionId = new URLSearchParams(window.location.search).get('session_id');
    // Call the function to start processing order
    if (sessionId) {
      processOrder(sessionId);
    } else {
      console.error('Error processing order: No sessionId found.');
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center my-25 px-4">
      {/* TODO: Add Confetti? */}
      <div className="max-w-md w-full relative overflow-hidden z-10 bg-gray-800 rounded-lg shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-audiowide text-center text-emerald-400 mb-2">
            Purchase Successful!
          </h1>
          <p className="text-gray-300 text-center mb-2">
            Thank you for your order! {"We're"} processing it now.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          {/* Order details */}
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Order number</span>
              <span className="text-sm font-semibold text-emerald-400">#{orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated delivery</span>
              <span className="text-sm font-semibold text-emerald-400">5-7 business days</span>
            </div>
          </div>
          <div className="space-y-4">
            {/* TODO: Add functionality to button */}
            <button className="w-full flex items-center justify-center font-bold py-2 px-4 rounded-lg">
              <HandHeart className="mr-2" size={18} /> Thanks for supporting us!
            </button>
            <Link
              to="/"
              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Continue Shopping <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
