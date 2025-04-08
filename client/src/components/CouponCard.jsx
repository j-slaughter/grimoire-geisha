/**
 * @module CouponCard.jsx
 * @description Card component for coupon input on cart page
 */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'motion/react';

import { updateCoupon } from '../store/reducers/cartReducer';
import axios from '../lib/axios.js';
import toast from 'react-hot-toast';

function CouponCard() {
  // Store inputted coupon code from user
  const [inputCode, setInputCode] = useState('');

  // Get coupon info from Redux store
  const { coupon } = useSelector((state) => state.cart);

  // Needed to update the Redux store
  const dispatch = useDispatch();

  /**
   * handleApplyCoupon - handles applying inputted coupon code from user
   */
  const handleApplyCoupon = async () => {
    try {
      // Check for valid coupon code
      const res = await axios.post('/coupons/validate', { code: inputCode });
      // Update coupon in Redux store
      dispatch(updateCoupon(res.data.coupon));
      toast.success('Coupon applied successfully!');
    } catch (error) {
      return toast.error(error.response.data.message || 'An error occurred applying coupon');
    }
  };

  /**
   * handleRemoveCoupon - handles removing inputted coupon code from user
   */
  const handleRemoveCoupon = () => {
    // Remove coupon from Redux store
    dispatch(updateCoupon(null));
    // Clear inputted coupon code
    setInputCode('');
  };

  return (
    <motion.div
      className="space-y-4 bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p className="text-xl font-semibold font-audiowide animate-neonSign text-fuchsia-400 hover:text-emerald-400">
        Coupon
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="coupon" className="mb-2 block text-sm font-medium text-gray-300">
            Do you have a coupon or gift card?
          </label>
          <input
            className="block w-full rounded-lg bg-gray-700 border border-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
            type="text"
            id="coupon"
            placeholder="Enter code here"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            required
          />
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium hover:text-amber-600 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </motion.button>
      </div>
      {/* Applied Coupon Info */}
      {coupon && (
        <div className="mt-4">
          <h3 className="text-base font-medium text-gray-300">Coupon Applied:</h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            className="mt-2 flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-red-600 hover:text-red-700"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove coupon
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default CouponCard;
