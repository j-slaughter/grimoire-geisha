/**
 * @module CouponsTab.jsx
 * @description Component with list of coupons for admin dashboard
 */

import { useEffect, useState } from 'react';
import { Star, StarOff } from 'lucide-react';
import { motion } from 'motion/react';

import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

function CouponsTab() {
  const [loading, setLoading] = useState(true);
  const [couponsList, setCouponsList] = useState([]);

  // Loads coupons list from database
  useEffect(() => {
    const getCouponsList = async () => {
      try {
        // Grab coupons from database
        const res = await axios.get('/coupons');
        setCouponsList(res.data.coupons);
        setLoading(false);
      } catch (error) {
        return toast.error(error.response.data.message || 'Error retrieving coupons list');
      }
    };

    // Call the function to load list
    getCouponsList();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            <div className="w-20 h-20 border-emerald-200 border-2 rounded-full"></div>
            <div className="w-20 h-20 border-emerald-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            <div className="mt-5 text-emerald-500 text-center text-xl font-semibold animate-pulse">
              Loading...
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="bg-gray-800 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50 rounded-lg mx-auto max-w-4xl overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr className="font-audiowide text-emerald-300">
                <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Coupon Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Expiration Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs uppercase tracking-wider">
                  Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {couponsList?.map((coupon) => (
                <tr key={coupon._id} className="group hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-15 w-15">
                        <img
                          className="h-15 w-15 rounded-full object-cover"
                          src="/gg-logo-black.png"
                          alt="Grimoire Geisha GG logo"
                        />
                      </div>
                      <div className="ml-4 group-hover:text-emerald-300">
                        <div className="text-sm font-medium">{coupon.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{coupon.discountPercentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white group-hover:text-emerald-300">
                    <div className="text-sm">{coupon.expirationDate.split('T')[0]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`p-2 rounded-full ${
                        coupon.isActive ? 'text-amber-600' : 'text-gray-300'
                      }`}
                    >
                      {coupon.isActive ? <Star /> : <StarOff />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </>
  );
}

export default CouponsTab;
