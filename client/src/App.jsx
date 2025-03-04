/**
 * @module App.jsx
 * @description Main app component. Contains routing for application.
 */
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';

function App() {
  useEffect(() => {
    console.log('Starting App!');
  }, []);

  return (
    <BrowserRouter>
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(54,219,197,0.8)_0%,rgba(178,69,203,0.7)_48%,rgba(0,0,0,0.1)_100%)]"></div>
      </div>
      <div className="relative z-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
