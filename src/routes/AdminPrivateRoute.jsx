import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import DataService from "../config/DataService";
import { useEffect, useRef } from "react";
import { logout } from "../redux/slices/AdminSlice";
import Index from "../containers/Index";

const AdminPrivateRoute = () => {
  const { token } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const logoutRef = useRef(null);
  const dispatch = useDispatch();
  const isAuthenticate = (token) => {
    if (!token) return false;
    DataService.defaults.headers.common.auth = token;
    return true;
  };

  // Response interceptor
  DataService.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error?.response &&
        error?.response?.status === 401 &&
        error?.response?.data?.message === "Session expired" &&
        !logoutRef.current
      ) {
        logoutRef.current = setTimeout(() => {
          Index.toast.success(error?.response?.data?.message);
          dispatch(logout());
          navigate("/admin");
        }, 1000);
      }
      return Promise.reject(error);
    }
  );
  return isAuthenticate(token) ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default AdminPrivateRoute;
