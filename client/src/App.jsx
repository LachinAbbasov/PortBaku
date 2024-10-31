import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProductManagement from './components/ProductManagement';
import Dashboard from './components/DashBoard';
import Login from './components/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import ErrorBoundary from './error/ErrorBoundary';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Kullanıcı oturumu

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Root "/" path, giriş yapılmışsa ProductManagement'a yönlendirme yap */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/product-management" /> // Giriş yapmışsa ProductManagement'a yönlendir
              ) : (
                <Navigate to="/login" /> // Giriş yapmamışsa login sayfasına yönlendir
              )
            }
          />
          
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          
          {/* Product Management route for all users */}
          <Route
            path="/product-management"
            element={<ProtectedRoute component={ProductManagement} />} // Tüm kullanıcılar için
          />

          {/* User dashboard route (isteğe bağlı) */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
