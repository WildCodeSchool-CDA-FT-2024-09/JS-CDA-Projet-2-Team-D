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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const {
    //data: loggedInUser,
    error: loggedInUserError,
    refetch,
  } = useGetAuthenticatedUserQuery({
    fetchPolicy: "network-only", // Don't use cache
    errorPolicy: "all", // Handle errors without throwing
    // This ensures the query runs on component mount
    skip: false,
    // Add credentials to all requests
    context: {
      credentials: "include",
    },
  });

  const checkAuth = async () => {
    // Manually refetch to ensure fresh data
    const { data: loggedInUser } = await refetch();

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
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
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
      value={{
        user,
        setUser,
        loading,
        checkAuth,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
