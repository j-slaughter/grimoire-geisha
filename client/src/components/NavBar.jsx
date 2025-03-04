/**
 * @module NavBar.jsx
 * @description Navigation bar component
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Sun, Moon } from 'lucide-react';

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

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md shadow-lg z-40">
      <div className="container mx-auto px-4 py-3">
        <Link to="/" className="flex items-center">
          <img src="gg-sticker.png" width="200" height="400" alt="Grimoire Geisha Logo" />
        </Link>
        <ShoppingCart />
        <UserPlus />
        <LogIn />
        <LogOut />
        <Lock />
        <button onClick={switchMode}>{mode === 'light' ? <Moon /> : <Sun />}</button>
      </div>
    </header>
  );
}

export default NavBar;
