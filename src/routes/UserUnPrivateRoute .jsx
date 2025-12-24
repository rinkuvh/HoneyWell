import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DataService from "../config/DataService";

const UserUnPrivateRoute = () => {
    const { token } = useSelector((state) => state.user);

    // const logout = useAutoLogout("user");
    
    const isAuthenticate = (token) => {
      if (!token) return false;
      DataService.defaults.headers.common.auth = token;
      return true;
    };
  
    return !isAuthenticate(token) ? <Outlet /> : <Navigate to="/user/dashboard" replace />;
  };
  

export default UserUnPrivateRoute;
