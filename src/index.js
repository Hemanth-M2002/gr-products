// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App'; // Ensure this path is correct based on your project structure
// import './index.css'; // Include your global styles

// // Create a root for the app
// const root = ReactDOM.createRoot(document.getElementById('root'));

// // Render the App component
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
