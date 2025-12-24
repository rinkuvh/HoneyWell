import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import DataService from "../config/DataService";
import { useEffect, useRef } from "react";
import { logoutUser } from "../redux/slices/UserSlice";
import Index from "../containers/Index";

const UserPrivateRoute = () => {
  const { token } = useSelector((state) => state.user);
  const logoutRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const logout = useAutoLogout("user");

  const isAuthenticate = (token) => {
    if (!token) return false;
    DataService.defaults.headers.common.auth = token;
    return true;
  };

  DataService.interceptors.response.use(
    (response) => response,
    (error) => {

      if (
        error?.response?.data?.status === 401 &&
        error?.response?.data?.message === "Session expired" &&
        !logoutRef.current
      ) {
        // Reset logout flag after a small delay
        logoutRef.current = setTimeout(() => {
          Index.toast.success(error?.response?.data?.message);
          navigate("/user");
          dispatch(logoutUser());
        }, 1000);
      }

      return Promise.reject(error);
    }
  );

  return isAuthenticate(token) ? <Outlet /> : <Navigate to="/user" replace />;
};

export default UserPrivateRoute;
