import _ from 'lodash';
import Homepage from './components/Homepage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/NavBar';
import LoginPage from './components/LoginPage';
import FavoritesPage from './components/FavoritesPage';
import 'bootstrap/dist/css/bootstrap.min.css';

//create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<Homepage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  </BrowserRouter>
</React.StrictMode>
);
  