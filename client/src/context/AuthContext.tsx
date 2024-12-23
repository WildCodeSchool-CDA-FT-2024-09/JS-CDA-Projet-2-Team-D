import { createContext, useState, useEffect, ReactNode } from "react";
import {
  useGetAuthenticatedUserQuery,
  useLoginMutation,
  useLogoutMutation,
} from "../types/graphql-types";

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
} | null;

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean | undefined>;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

// Create the context with default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Provider component props
interface AuthProviderProps {
  children: ReactNode;
}

// Implement the provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check authentication status on mount
    checkAuth();
  }, []);

  const { data: loggedInUser, error: loggedInUserError } =
    useGetAuthenticatedUserQuery();

  const checkAuth = async () => {
    try {
      if (!loggedInUserError && loggedInUser) {
        setUser({
          id: loggedInUser!.getAuthenticatedUser.id,
          firstname: loggedInUser!.getAuthenticatedUser.firstname,
          lastname: loggedInUser!.getAuthenticatedUser.lastname,
          email: loggedInUser!.getAuthenticatedUser.email,
          roles: loggedInUser!.getAuthenticatedUser.roles.map((role) =>
            role.id.toString(),
          ),
        });
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const [loginMutation] = useLoginMutation();

  const login = async (email: string, password: string) => {
    try {
      const response = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (response.data?.login) {
        const user = response.data.login;

        setUser({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          roles: user.roles.map((role) => role.id.toString()),
        });

        return true;
      } else if (response.errors) {
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, checkAuth, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
