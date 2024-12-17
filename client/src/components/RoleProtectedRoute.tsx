import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

interface RoleProtectedRouteProps {
  children: JSX.Element;
  requiredRole: string; // Role required to access the route
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, hasRole } = useUser();

  if (!isAuthenticated || !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
