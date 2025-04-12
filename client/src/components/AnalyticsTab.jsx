/**
 * @module AnalyticsTab.jsx
 * @description Analytics tab component for admin dashboard
 */

import { useEffect, useState } from 'react';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { motion } from 'motion/react';

import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import Loader from './Loader.jsx';
import AnalyticsCard from './AnalyticsCard.jsx';

function AnalyticsTab() {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [dailySalesData, setDailySalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve analytics data from database
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axios.get('/analytics');
        // Update state
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.error(`Error fetching analytics data: ${error}`);
        toast.error(
          error.response.data.message || 'An error occurred while fetching analytics data'
        );
      } finally {
        setLoading(false);
      }
    };
    // Call function to retrieve analytics data
    fetchAnalyticsData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader height={'min-h-64'} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AnalyticsCard
              title="Total Users"
              value={analyticsData.users.toLocaleString()}
              icon={Users}
              color="from-emerald-500 to-teal-700"
            />
            <AnalyticsCard
              title="Total Products"
              value={analyticsData.products.toLocaleString()}
              icon={Package}
              color="from-emerald-500 to-green-700"
            />
            <AnalyticsCard
              title="Total Sales"
              value={analyticsData.totalSales.toLocaleString()}
              icon={ShoppingCart}
              color="from-emerald-500 to-cyan-700"
            />
            <AnalyticsCard
              title="Total Revenue"
              value={`$${analyticsData.totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              color="from-emerald-500 to-lime-700"
            />
          </div>
          <motion.div
            className="bg-gray-800/60 rounded-lg p-6 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#D1D5DB" />
                <YAxis yAxisId="left" stroke="#D1D5DB" />
                <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#36dbc5"
                  activeDot={{ r: 8 }}
                  name="Sales"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#d04c91"
                  activeDot={{ r: 8 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default AnalyticsTab;
