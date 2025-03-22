/**
 * @module AdminDashboard.jsx
 * @description Renders dashboard page where admins can manage products, coupons,
 * and access analytics data
 */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CirclePlus, Store, TicketPlus, Tag, ChartNoAxesCombined } from 'lucide-react';
import { motion } from 'motion/react';

import { loadProducts } from '../store/reducers/productReducer.js';
import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

import ProductForm from '../components/ProductForm.jsx';
import ProductsTab from '../components/ProductsTab.jsx';
import CouponForm from '../components/CouponForm.jsx';
import CouponsTab from '../components/CouponsTab.jsx';
import AnalyticsTab from '../components/AnalyticsTab.jsx';

const tabs = [
  { id: 'create-product', label: 'Create Product', icon: CirclePlus, component: ProductForm },
  { id: 'products', label: 'Products', icon: Store, component: ProductsTab },
  { id: 'create-coupon', label: 'Create Coupon', icon: TicketPlus, component: CouponForm },
  { id: 'coupons', label: 'Coupons', icon: Tag, component: CouponsTab },
  { id: 'analytics', label: 'Analytics', icon: ChartNoAxesCombined, component: AnalyticsTab },
];

function AdminDashboard() {
  // Keep track of which tab user is on
  // Preset active tab to create product
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Needed to update the Redux store
  const dispatch = useDispatch();

  // Load product list from database to state
  useEffect(() => {
    const getProductList = async () => {
      try {
        // Grab products from database
        const res = await axios.get('/products');
        dispatch(loadProducts(res.data.products));
      } catch (error) {
        return toast.error(error.response.data.message || 'Error retrieving products list');
      }
    };
    // Call the function to load list
    getProductList();
  }, [dispatch]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative container mx-auto my-45 px-4 py-16 z-10">
        <motion.h1
          className="text-4xl font-bold font-audiowide mb-8 text-pink-400 text-center animate-neonSign"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
        <motion.div
          className="flex flex-wrap justify-center mb-16"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 mx-2 my-2 rounded-md transition-colors duration-200 ${
                activeTab.id === tab.id
                  ? 'shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50'
                  : 'hover:text-amber-600 hover:scale-110'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <tab.icon className="inline-block" size={18} />
              <span className="inline ml-2">{tab.label}</span>
            </button>
          ))}
        </motion.div>
        {/* Render the active tab JSX element */}
        {<activeTab.component />}
      </div>
    </div>
  );
}

export default AdminDashboard;
