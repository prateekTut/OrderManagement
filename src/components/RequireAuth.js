import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth.roles + "in requirea auth")
    const roles = localStorage.getItem("roles")
    //auth?.roles?.find(role => allowedRoles?.includes(role))
/*     return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    ); */
    return allowedRoles.find((role) => roles.includes(role)) ? (
        <Outlet />
      ) : auth?.name ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/register" state={{ from: location }} replace />
      );
}

export default RequireAuth;