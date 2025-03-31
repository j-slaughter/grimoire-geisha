/**
 * @module App.jsx
 * @description Main app component. Contains routing for application.
 */
import { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import CategoryPage from './pages/CategoryPage.jsx';

// Create Wrapper to scroll up with React Router
const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

function App() {
  useEffect(() => {
    console.log('Starting App!');
  }, []);

  // Redirect routes depending on user status
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === 'admin';

  return (
    <BrowserRouter>
      <Wrapper>
        <div className="min-h-screen relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(54,219,197,0.8)_0%,rgba(178,69,203,0.7)_48%,rgba(0,0,0,0.1)_100%)]"></div>
          </div>
          <div className="relative z-50 pt-20">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route
                path="/dashboard"
                element={!isAdmin ? <Navigate to="/login" /> : <AdminDashboard />}
              />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </div>
          {/*Pop-up notifications*/}
          <Toaster />
        </div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
