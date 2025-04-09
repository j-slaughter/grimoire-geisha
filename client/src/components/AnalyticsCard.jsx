/**
 * @module AnalyticsCard.jsx
 * @description Card component for analytics
 */

import { motion } from 'motion/react';

function AnalyticsCard({ title, value, icon: Icon, color }) {
  return (
    <motion.div
      className={`relative overflow-hidden bg-gray-800 ${color} rounded-lg p-6 shadow-lg shadow-cyan-500/50 ring-2 ring-cyan-500/50`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div className="z-10">
          <p className="text-emerald-300 text-sm mb-1 font-semibold">{title}</p>
          <h3 className="text-white text-3xl font-bold font-audiowide">{value}</h3>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-pink-900 opacity-30"></div>
      <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
        <Icon className="h-32 w-32" />
      </div>
    </motion.div>
  );
}

export default AnalyticsCard;
