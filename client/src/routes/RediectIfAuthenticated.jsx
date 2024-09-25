import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('username');

  if (isAuthenticated) {
    // If the user is authenticated, redirect them to the home or dashboard page
    return <Navigate to="/dashboard" />;
  }

  // If not authenticated, render the requested component (e.g., login or signup form)
  return children;
};

export default RedirectIfAuthenticated;