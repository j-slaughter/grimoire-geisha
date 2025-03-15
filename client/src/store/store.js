/**
 * @module store.js
 * @description Configure Redux store for state management
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from './reducers/userReducer.js';
import cartReducer from './reducers/cartReducer.js';

// Reference for problem of persisting Redux state through page refresh
// https://dev.to/mihomihouk/persisting-state-on-page-refresh-in-reactredux-app-58cf
// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
