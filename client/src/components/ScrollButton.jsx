/**
 * @module ScrollButton.jsx
 * @description Button that scrolls user back to top of page
 */

import { useState } from 'react';
import { CircleArrowUp } from 'lucide-react';

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  /**
   * toggleVisible - toggles whether the scroll up botton is visible based on page position
   */
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  /**
   * scrollToTop - scrolls window position back to top of page
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Listen for scroll event on window to know when to toggle button
  window.addEventListener('scroll', toggleVisible);

  return (
    <button
      className={`fixed inset-x-0 bottom-0 z-10 rounded-lg px-5 py-2.5 text-center ${
        visible ? 'flex items-center justify-center' : 'hidden'
      }`}
      onClick={scrollToTop}
    >
      <CircleArrowUp size={30} />
    </button>
  );
}

export default ScrollButton;
