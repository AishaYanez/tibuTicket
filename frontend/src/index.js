import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Authpage from './pages/Auth/authPage';
import MainPage from './pages/Main/main.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Authpage />
    <MainPage />
  </React.StrictMode>
);
reportWebVitals();
