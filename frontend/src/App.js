import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './index.css';
import Authpage from './pages/Auth/authPage.js';
import AdminMainPage from './pages/Main-Admin/main.js';
import UserMainPage from './pages/Main-User/main.js';
import ClientMainPage from './pages/Main-Client/main.js';

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Authpage />} />
      <Route path='/AdminPage' element={<AdminMainPage />} />
      <Route path='/UserPage' element={<UserMainPage />} />
      <Route path='/ClientPage' element={<ClientMainPage />} />
    </Routes>
    </BrowserRouter>
  );
};

 export default App;