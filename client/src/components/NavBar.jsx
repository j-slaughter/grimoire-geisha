/**
 * @module NavBar.jsx
 * @description Navigation bar component
 */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Sun, Moon } from 'lucide-react';

import { updateUser } from '../store/reducers/userReducer.js';
import axios from '../lib/axios.js';
import { toast } from 'react-hot-toast';

function NavBar() {
  /*
   * Toggle light or dark mode:
   * Adopt the theme from system preferences or previously stored mode from localStorage
   */
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  let initialMode = prefersDarkMode.matches ? 'dark' : 'light';
  let currentMode = localStorage.getItem('mode');
  // Check for previous setting, otherwise store user's initial mode to localStorage
  if (currentMode === null) {
    localStorage.setItem('mode', initialMode);
  } else {
    // Check for previously selected mode
    if (currentMode !== initialMode) {
      document.body.classList.add(`${currentMode}-mode`);
    }
    initialMode = currentMode;
  }
  // Keep track of mode state
  const [mode, setMode] = useState(initialMode);

  /**
   * switchMode - toggles the theme mode and updates localStorage
   */
  function switchMode() {
    const currentMode = localStorage.getItem('mode');
    document.body.removeAttribute('class');
    if (currentMode === 'light') {
      // Change to dark
      localStorage.setItem('mode', 'dark');
      document.body.classList.add('dark-mode');
      setMode('dark');
    } else if (currentMode === 'dark') {
      // Change to light
      localStorage.setItem('mode', 'light');
      document.body.classList.add('light-mode');
      setMode('light');
    }
  }

  // Get current user and cart info from Redux store
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === 'admin';
  const { cart } = useSelector((state) => state.cart);

  // Needed to update the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * logout - logs the user out of the app
   */
  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      // Update user state back to null
      dispatch(updateUser(null));
      // Navigate back to home page
      navigate('/');
    } catch (error) {
      return toast.error(error.response.data.message || 'An error occurred during logout');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md shadow-lg z-40 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-center sm:justify-evenly md:justify-between items-center">
          <Link to="/" className="flex justify-center items-center">
            <img src="gg-sticker.png" width="200" height="400" alt="Grimoire Geisha Logo" />
          </Link>
          <nav className="flex flex-wrap justify-center items-center gap-4">
            {user && (
              <Link to="/cart" className="relative group transition duration-300 ease-in-out">
                <ShoppingCart className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-3 -left-5 bg-emerald-400 text-white text-xs rounded-full px-2 py-0.5 group-hover:bg-amber-600 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/dashboard"
                className="flex items-center bg-emerald-400 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                <Lock className="inline-block" size={18} />
                <span className="hidden sm:inline ml-2">Dashboard</span>
              </Link>
            )}
            {user ? (
              <button className="py-2 px-4 rounded-md flex items-center" onClick={logout}>
                <LogOut className="inline-block" size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="flex items-center bg-emerald-400 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} /> Sign Up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} /> Login
                </Link>
              </>
            )}
            <button className="py-2 px-4 rounded-md flex items-center" onClick={switchMode}>
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
