/**
 * @module Login.jsx
 * @description Renders Login page
 */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'motion/react';

import { updateLoading, updateUser } from '../store/reducers/userReducer.js';
import { loadCart } from '../store/reducers/cartReducer.js';
import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

function Login() {
  // Keep track of form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get user loading info from Redux store
  const { loading } = useSelector((state) => state.user);

  // Needed to update the Redux store
  const dispatch = useDispatch();

  /**
   * loginUser - login the user
   */
  const loginUser = async (email, password) => {
    // Update loading state to true
    dispatch(updateLoading(true));
    // Check for vaild user
    try {
      const res = await axios.post('/auth/login', { email, password });
      const user = res.data.user;
      // Update user info in state
      // Since state persists in browser's localStorage, only store non-sensitive info
      dispatch(updateUser({ name: user.name, role: user.role }));
      // Load user's saved cart to state
      getCartItems();
      dispatch(updateLoading(false));
    } catch (error) {
      dispatch(updateLoading(false));
      return toast.error(error.response.data.message || 'An error occurred during login');
    }
  };

  /**
   * handleSubmit - handles user's form data
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  /**
   * getCartItems - retrieves user's saved cart from database
   */
  const getCartItems = async () => {
    try {
      const res = await axios.get('/cart');
      // Update cart in state
      dispatch(loadCart(res.data.cart));
    } catch (error) {
      return toast.error(
        error.response.data.message || 'An error occurred retrieving the shopping cart'
      );
    }
  };

  return (
    <div className="flex flex-col justify-center my-45 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400 font-audiowide animate-neonSign">
          Login to your account
        </h2>
      </motion.div>
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 sm:rounded-lg sm:px-10 shadow-xl shadow-cyan-500/50 ring-2 ring-cyan-500/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm text-white">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm text-white">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
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
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{' '}
            <Link to="/signup" className="text-emerald-400">
              Sign up now <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
