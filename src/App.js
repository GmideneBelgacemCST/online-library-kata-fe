import React from 'react';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import RegisterPage from './domains/users/pages/RegisterPage';
import LoginPage from './domains/users/pages/LoginPage';
import HomePage from './components/HomePage';
import Navbar from './components/common/navbar/Navbar';
import NotFoundPage from './components/common/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
	return (
        
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={
            <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
	);
  }
 
  export default App;
