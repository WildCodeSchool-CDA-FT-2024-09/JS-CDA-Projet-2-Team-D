import { createContext, useState, ReactNode } from "react";

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
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
