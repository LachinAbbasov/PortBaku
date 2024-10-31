import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, adminRoute, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Kullanıcının oturum açıp açmadığını kontrol ediyoruz
  const userRole = localStorage.getItem('role'); // Kullanıcı rolünü alıyoruz

  if (!isAuthenticated) {
    // Giriş yapılmamışsa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  if (adminRoute && userRole !== 'admin') {
    // Eğer admin rotasına erişmeye çalışıyor ama admin değilse kullanıcıyı dashboard'a yönlendir
    return <Navigate to="/dashboard" />;
  }

  // Eğer kullanıcı giriş yapmışsa ve gerekli yetkilere sahipse bileşeni render et
  return <Component {...rest} />;
};

export default ProtectedRoute;
