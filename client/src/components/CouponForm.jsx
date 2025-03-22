/**
 * @module CouponForm.jsx
 * @description Coupon form tab component for admin dashboard
 */

import { useState } from 'react';
import { TicketPlus, Loader } from 'lucide-react';
import { motion } from 'motion/react';

import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

function CouponForm() {
  // Store new coupon form info
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountPercentage: '',
    expirationDate: '',
  });

  const [loading, setLoading] = useState(false);

  // Format date for expiration date minimum
  const formatDate = () => {
    const date = new Date();
    // Convert the date to ISO string
    const isoString = date.toISOString();
    // Split at the "T" character to get the date part
    const formattedDate = isoString.split('T')[0];
    return formattedDate;
  };

  const todayDate = formatDate();

  /**
   * createCoupon - creates a new coupon
   */
  const createCoupon = async (couponData) => {
    // Update loading state to true
    setLoading(true);
    // Create new coupon
    try {
      const res = await axios.post('/coupons', couponData);
      setLoading(false);
      return toast.success(res.data.message || 'Successfully created!');
    } catch (error) {
      setLoading(false);
      return toast.error(error.response.data.message || 'An error occurred creating new coupon');
    }
  };

  /**
   * handleSubmit - handles coupon form data to create new coupon
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCoupon(newCoupon);
    // Clear form fields
    setNewCoupon({
      code: '',
      discountPercentage: '',
      expirationDate: '',
    });
  };

  return (
    <motion.div
      className="bg-gray-800 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50 rounded-lg p-8 mb-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl text-center font-semibold font-audiowide mb-6 text-emerald-300">
        Create A New Coupon
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="code" className="block text-sm font-medium text-gray-300">
            Coupon Code
          </label>
          <input
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            type="text"
            id="code"
            name="code"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-300">
            Discount Percentage
          </label>
          <input
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            type="number"
            step="1"
            min="0"
            max="100"
            id="discountPercentage"
            name="discountPercentage"
            placeholder="0"
            value={newCoupon.discountPercentage}
            onChange={(e) => setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-300">
            Expiration Date
          </label>
          <input
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            type="date"
            min={todayDate}
            id="expirationDate"
            name="expirationDate"
            value={newCoupon.expirationDate}
            onChange={(e) => setNewCoupon({ ...newCoupon, expirationDate: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Loading...
            </>
          ) : (
            <>
              <TicketPlus className="mr-2 h-5 w-5" />
              Create Coupon
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default CouponForm;
