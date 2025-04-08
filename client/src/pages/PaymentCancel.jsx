/**
 * @module PaymentCancel.jsx
 * @description Redirect page when user cancels a cart payment
 */

import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle } from 'lucide-react';

function PaymentCancel() {
  return (
    <div className="h-screen flex items-center justify-center my-25 px-4">
      <div className="max-w-md w-full relative overflow-hidden z-10 bg-gray-800 rounded-lg shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <XCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-audiowide text-center text-red-500 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Your order has been cancelled. No charges have been made.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 text-center">
              If you encountered any issues during the checkout process, please {"don't"} hesitate
              to contact our support team.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCancel;
