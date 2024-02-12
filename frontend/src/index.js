import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Authpage from './pages/Auth/authPage';
import AdminMainPage from './pages/Main-Admin/main.js';
import UserMainPage from './pages/Main-User/main.js';
import ClientMainPage from './pages/Main-Client/main.js';
import reportWebVitals from './reportWebVitals';

const RootComponent = () => (
  <React.StrictMode>
    <Routes>
    <Route path='/' element={<Authpage/>} />
    <Route path='/AdminMainPage' element={<AdminMainPage/>} />
    <Route path='/UserMainPage' element={<UserMainPage/>} />
    <Route path='/ClientMainPage' element={<ClientMainPage/>} />
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
