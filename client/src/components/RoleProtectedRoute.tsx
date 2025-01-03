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
  const { user, loading } = useUser();

  if (loading) return <p>🥁 Chargement...</p>;
  if (!user?.email || !user.roles.some((role) => role === requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
