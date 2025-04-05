/**
 * @module OrderSummary.jsx
 * @description Component with cart order total and subtotal
 */

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { motion } from 'motion/react';

function OrderSummary() {
  // Get total, subtotal, and coupon info from Redux store
  const { total, subtotal, coupon } = useSelector((state) => state.cart);
  const savings = (subtotal - total).toFixed(2);

  return (
    <motion.div
      className="space-y-4 bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6 shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold font-audiowide animate-neonSign text-fuchsia-400 hover:text-emerald-400">
        Order Summary
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          {/* Subtotal */}
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">Original price</dt>
            <dd className="text-base font-medium text-white">${subtotal}</dd>
          </dl>
          {/* Coupon info */}
          {coupon && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Coupon ({coupon.code})</dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          {/* Savings */}
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">-${savings}</dd>
            </dl>
          )}
          {/* Total */}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-emerald-400">${total}</dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 font-medium hover:text-amber-600 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => console.log('Pay me!')}
        >
          Proceed to Checkout
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default OrderSummary;
