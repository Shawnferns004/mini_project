import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const isAdmin = user?.role === "admin";


  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/shop/home"} />;
  }

  if (isAuthenticated && !isAdmin && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  if (isAuthenticated && isAdmin && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
