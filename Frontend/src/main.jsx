import './index.css';
import App from './App.jsx'
// import './index.css'
// ----
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext'; 
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);