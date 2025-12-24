import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import DataService from '../config/DataService';
import { useSelector } from 'react-redux';

const AdminUnPrivateRoutes = () => {
    const { token } = useSelector((state) => state.admin);
    const location = useLocation();
  
  
  
    // useEffect(() => {
    //   getPermissionData();
    // }, [location?.pathname]);
  
    const isAuthenticate = (token) => {
      if (!token) return false;
      DataService.defaults.headers.common.auth = token;
      return true;
    };
  
    return !isAuthenticate(token) ? <Outlet /> : <Navigate to="/admin/dashboard" replace />;
}

export default AdminUnPrivateRoutes