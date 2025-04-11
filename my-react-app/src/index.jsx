// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Import Provider from react-redux
import { Provider } from 'react-redux';

// 2. Import your configured Redux store
//    (Make sure the path is correct and store is exported correctly from store.js)
import { store } from './redux/store';
// or 'import store from ./redux/store' if it's a default export

// Import your main App component and CSS
import App from './App';
import './App.css'; // Ensure App.css is imported if needed globally here too

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 3. Wrap your entire App component with the Provider */}
    {/* 4. Pass your imported store as a prop to the Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
