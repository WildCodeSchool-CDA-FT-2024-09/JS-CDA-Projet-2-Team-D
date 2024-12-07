import { createContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: number;
  firstname: string;
  email: string;
  roles: number[];
  authToken?: string;
} | null;

export type UserContextType = {
  user: User | null;
  login: (user: User | null) => void;
  logout: () => void;
};

// Create the context with default values
export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

// Provider component props
interface UserProviderProps {
  children: ReactNode;
}

// Implement the provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Sync state with localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      if (JSON.stringify(parsedUser) !== JSON.stringify(user)) {
        setUser(parsedUser);
      }
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
