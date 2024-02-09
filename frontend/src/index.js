import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Authpage from './pages/Auth/authPage';
import MainPage from './pages/Main/main.js';
import reportWebVitals from './reportWebVitals';

const RootComponent = () => (
  <React.StrictMode>
    <Routes>
    <Route path='/' element={<Authpage/>} />
    <Route path='/MainPage' element={<MainPage/>} />
    </Routes>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>
);
reportWebVitals();
