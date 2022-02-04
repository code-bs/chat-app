import React, { useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getRefreshTokenAsync } from '../store/auth/actions';

const RequireAuth = () => {
  const auth = useAppSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    signin: { data },
  } = auth;
  useEffect(() => {
    if (!data) dispatch(getRefreshTokenAsync.request({}));
  }, [dispatch, data]);

  if (!data) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
