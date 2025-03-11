/**
 * @module main.jsx
 * @description entry point for React application
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App.jsx';
import store from './store/store.js';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    {/*Wrap app in Provider component to pass store (access to global state)*/}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
