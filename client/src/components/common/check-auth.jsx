import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Redirect unauthenticated users trying to access protected routes
  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from login/register pages
  if (isAuthenticated && (location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Prevent non-admin users from accessing admin routes
  if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Prevent admin users from accessing shopping routes
  if (isAuthenticated && user?.role === 'admin' && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;