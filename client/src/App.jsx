/**
 * @module App.jsx
 * @description Main app component. Contains routing for application.
 */
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

function App() {
  useEffect(() => {
    console.log('Starting App!');
  }, []);

  // Redirect routes depending on user status
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
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
          </Routes>
        </div>
        {/*Pop-up notifications*/}
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
