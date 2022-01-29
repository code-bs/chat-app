import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const RequireAuth = () => {
  const auth = useAppSelector(state => state.auth);
  const location = useLocation();
  const {
    signin: { data },
  } = auth;
  if (!data) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
