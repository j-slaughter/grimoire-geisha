import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home.jsx';

function App() {
  useEffect(() => {
    console.log('Starting App!');
  }, []);

  return (
    <>
      <h1 className="text-red-500">Vite + React</h1>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
